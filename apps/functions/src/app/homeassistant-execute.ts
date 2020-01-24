import { asyncForEach } from '@nx-home-assistant/common';
import {
  SmartHomeV1ExecutePayload,
  SmartHomeV1ExecuteRequest,
  SmartHomeV1ExecuteResponse,
  SmartHomeV1ExecuteResponseCommands
} from 'actions-on-google';
import { ApiClientObjectMap } from 'actions-on-google/dist/common';
import { IUserModel } from './common/user.model';
import { queryFirebase } from './homeassistant-query';
import { callService, getDeviceStatus } from './utils/queries';

interface IParms {
  [key: string]: any;
}

const commandMap: {
  [command: string]: (
    user: IUserModel,
    deviceId: string,
    parms: IParms
  ) => Promise<SmartHomeV1ExecuteResponseCommands>;
} = {};

const createCommand = (
  id: string,
  status: IParms
): SmartHomeV1ExecuteResponseCommands => {
  return {
    ids: [id],
    status: 'SUCCESS',
    states: status
  };
};

commandMap['action.devices.commands.GetCameraStream'] = (
  _user: IUserModel,
  deviceId: string,
  _parms: {
    [key: string]: any;
  }
): Promise<SmartHomeV1ExecuteResponseCommands> => {
  const xxx = createCommand(deviceId, {
    // cameraStreamAccessUrl:
    //   'http://192.168.10.80:8080/stream/e34a63e9-f109-48e0-a352-b679a403a553/index.m3u8'
    cameraStreamAccessUrl: 'http://192.168.10.80:8090/help.m3u8'
  });

  console.warn('Showing Camera GetCameraStream', xxx);

  return Promise.resolve(xxx);
};

commandMap['action.devices.commands.OnOff'] = async (
  user: IUserModel,
  deviceId: string,
  parms: {
    [key: string]: any;
  }
): Promise<SmartHomeV1ExecuteResponseCommands> => {
  const device = await queryFirebase(deviceId);

  const state = await getDeviceStatus(deviceId);

  const on: boolean = parms.on;

  if (device.entityId.startsWith('climate')) {
    await callService(user, 'climate', on ? 'turn_on' : 'turn_off', {
      entity_id: device.entityId
    });
    if (on) {
      await callService(user, 'climate', 'set_hvac_mode', {
        entity_id: device.entityId,
        hvac_mode: state.thermostatMode
      });
    }
  } else {
    await callService(user, 'switch', on ? 'turn_on' : 'turn_off', {
      entity_id: device.entityId
    });
  }

  state.on = on;

  return createCommand(deviceId, state);
};

commandMap['action.devices.commands.ThermostatSetMode'] = async (
  user: IUserModel,
  deviceId: string,
  parms: {
    [key: string]: any;
  }
): Promise<SmartHomeV1ExecuteResponseCommands> => {
  const device = await queryFirebase(deviceId);

  const state = await getDeviceStatus(deviceId);

  const thermostatMode = parms.thermostatMode;

  await callService(user, 'climate', 'set_hvac_mode', {
    entity_id: device.entityId,
    hvac_mode: thermostatMode
  });

  state.thermostatMode = thermostatMode;

  return createCommand(deviceId, state);
};

commandMap['action.devices.commands.ThermostatTemperatureSetpoint'] = async (
  user: IUserModel,
  deviceId: string,
  parms: {
    [key: string]: any;
  }
): Promise<SmartHomeV1ExecuteResponseCommands> => {
  const thermostatTemperatureSetpoint = parms.thermostatTemperatureSetpoint;

  const device = await queryFirebase(deviceId);

  const state = await getDeviceStatus(deviceId);

  await callService(user, 'climate', 'set_temperature', {
    entity_id: device.entityId,
    temperature: thermostatTemperatureSetpoint,
    hvac_mode: state.thermostatMode
  });

  state.thermostatTemperatureSetpoint = thermostatTemperatureSetpoint;

  return createCommand(deviceId, state);
};

export const execute = async (
  user: IUserModel,
  body: SmartHomeV1ExecuteRequest
): Promise<SmartHomeV1ExecuteResponse> => {
  console.log('[onExecute]');
  const { requestId } = body;

  const payload: SmartHomeV1ExecutePayload = {
    commands: []
  };

  const items: {
    deviceId: string;
    execCommand: string;
    params: ApiClientObjectMap<any>;
  }[] = [];

  for (const input of body.inputs) {
    for (const command of input.payload.commands) {
      for (const device of command.devices) {
        const deviceId = device.id;
        for (const execution of command.execution) {
          const execCommand = execution.command;
          const params = execution.params;

          console.log('[onExecute]', execCommand, deviceId, params);

          items.push({
            deviceId,
            execCommand,
            params
          });
        }
      }
    }
  }

  await asyncForEach(
    items,
    async (item: {
      deviceId: string;
      execCommand: string;
      params: ApiClientObjectMap<any>;
    }) => {
      if (item.execCommand in commandMap) {
        const cmd = await commandMap[item.execCommand](
          user,
          item.deviceId,
          item.params
        );
        payload.commands.push(cmd);
      } else {
        console.error('Unkndow Command', item.execCommand, item.params);
      }
    }
  );

  return {
    requestId,
    payload
  };
};
