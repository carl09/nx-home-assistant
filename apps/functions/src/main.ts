import * as functions from 'firebase-functions';
// tslint:disable-next-line: no-var-requires
const admin = require('firebase-admin');
admin.initializeApp();

import {
  smarthome,
  SmartHomeV1ExecuteRequest,
  SmartHomeV1QueryPayload,
  SmartHomeV1QueryRequest,
  SmartHomeV1ReportStateRequest,
  SmartHomeV1SyncRequest
} from 'actions-on-google';
import * as shortid from 'shortid';
import { fakeauth, faketoken } from './app/auth';
import { getTransforms } from './app/common/device.fn';
import { IHomeAssistantEntity } from './app/common/device.model';
import { DeviceStatus } from './app/device.model';
import { execute } from './app/homeassistant-execute';
import { queryDevice } from './app/homeassistant-query';
import { syncDevices } from './app/homeassistant-sync';
import { asyncForEach, globalAgentUserId } from './app/utils/constant';
import {
  findDeviceStatusByEntityId,
  getCurrentUser,
  setDeviceStatus
} from './app/utils/queries';
import { environment } from './environments/environment';

export { faketoken, fakeauth };

const app = smarthome({
  // debug: true,
  key: environment.apikey,
  jwt: environment.jwt
});

app.onSync(async (_body: SmartHomeV1SyncRequest) => {
  console.log('[onSync]');

  const user = await getCurrentUser();

  const device = await syncDevices(user);
  return {
    requestId: shortid.generate(),
    payload: {
      agentUserId: globalAgentUserId,
      devices: device
    }
  };
});

app.onQuery(async (body: SmartHomeV1QueryRequest) => {
  console.log('[onQuery]');
  const { requestId } = body;
  const payload: SmartHomeV1QueryPayload = {
    devices: {}
  };

  const user = await getCurrentUser();

  await asyncForEach(
    body.inputs[0].payload.devices,
    async (device: { id: string }) => {
      const data = await queryDevice(user, device.id);
      payload.devices[device.id] = data;
    }
  );

  return {
    requestId,
    payload
  };
});

app.onDisconnect(() => {
  console.log('[onDisconnect]');
  // const response: SmartHomeV1DisconnectResponse = {};
  return {};
});

app.onExecute(async (body: SmartHomeV1ExecuteRequest) => {
  console.log('[onExecute]');

  const user = await getCurrentUser();

  return execute(user, body);
});

export const homeassistant = functions.https.onRequest(app);
export const requestsync = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    console.info(`Request SYNC for user ${globalAgentUserId}`);
    const response = await app.requestSync(globalAgentUserId);
    res.json({ response });
  }
});

export const syncDevice = functions.https.onRequest(
  async (request, response) => {
    const entity: IHomeAssistantEntity = request.body;

    console.info(`[Sync Device] entity`, entity);

    const device = await findDeviceStatusByEntityId(entity.entity_id);

    console.info(`[Sync Device] device`, device);

    // getEntity(user, device.entityId).then(entity =>{

    const d: DeviceStatus = {
      online: true
    };

    const trans = getTransforms(device.model.traits);

    const deviceStatus = trans.reduce((acc, t) => {
      const result = t.query(device.model, entity);

      Object.keys(result).map(x => {
        if (result[x] !== undefined) {
          acc[x] = result[x];
        }
      });

      return acc;
    }, d);

    // // tslint:disable-next-line: no-floating-promises
    await setDeviceStatus(device.id, deviceStatus);

    console.info(`[Sync Device] update`, deviceStatus);

    response.json(deviceStatus);

    return true;
  }
);

export const reportstate = functions.firestore
  .document('devices/{deviceId}')
  .onWrite(async (change, context) => {
    console.log('[reportstate]');

    const snapshot = change.after.data();

    const deviceId: string = context.params.deviceId;

    console.info('SnapShot', deviceId, snapshot);

    const requestBody: SmartHomeV1ReportStateRequest = {
      requestId: shortid.generate(),
      agentUserId: globalAgentUserId,
      payload: {
        devices: {
          states: {}
        }
      }
    };

    if (snapshot) {
      requestBody.payload.devices.states[deviceId] = snapshot.states;
    }

    await app.reportState(requestBody);
  });
