import { setDeviceStatus } from '@nx-home-assistant/data-access';
import {
  DeviceStatus,
  getTransforms,
  IManagedDeviceModel
} from '@nx-home-assistant/common';
import * as admin from 'firebase-admin';
import { IUserModel } from './common/user.model';
import { getDeviceStatus, getEntity } from './utils/queries';

export const queryDevice = async (
  user: IUserModel,
  deviceId: string
): Promise<DeviceStatus> => {
  console.log('[queryDevice] deviceId', deviceId);

  const storedDeviceStatus = await getDeviceStatus(deviceId);

  if (!storedDeviceStatus) {
    const device = await queryFirebase(deviceId);
    const d: DeviceStatus = {
      online: true
    };

    console.log('[queryDevice] device', device.name);

    const entity = await getEntity(user, device.entityId);

    const trans = getTransforms(device.traits);

    const deviceStatus = trans.reduce((acc, t) => {
      if (t) {
        const result = t.query(device, entity);

        Object.keys(result).map(x => {
          if (result[x] !== undefined) {
            acc[x] = result[x];
          }
        });
      }

      return acc;
    }, d);

    await setDeviceStatus(deviceId, deviceStatus);

    return deviceStatus;
  }

  return storedDeviceStatus;
};

export const queryFirebase = (
  deviceId: string
): Promise<IManagedDeviceModel> => {
  admin.auth();

  const db = admin.firestore();

  return new Promise((resolve, reject) => {
    const docRef = db.doc(`devices/${deviceId}`);

    docRef
      .get()
      .then(snapshot => {
        const doc = snapshot.data() as IManagedDeviceModel;
        console.log('[queryFirebase] doc', doc);

        resolve(doc);
      })
      .catch(err => reject(err));
  });
};
