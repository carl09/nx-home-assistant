import {
  SmartHomeV1ExecutePayload,
  SmartHomeV1ExecuteRequest,
  SmartHomeV1ExecuteResponse,
  SmartHomeV1ExecuteResponseCommands
} from 'actions-on-google';
import { ApiClientObjectMap } from 'actions-on-google/dist/common';
import { IUserModel } from './common/user.model';
import { queryFirebase } from './homeassistant-query';
import { asyncForEach } from './utils/constant';
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
  return Promise.resolve(
    createCommand(deviceId, {
      cameraStreamAccessUrl:
        'https://carlishome.duckdns.org:7883/api/camera_proxy_stream/camera.upstairscamera?token=79b6ce2cdf54949d0e91a8a2dffce17b0f142563b5015c565af44d518177fb29'
    })
  );
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
  } else {
    await callService(user, 'switch', on ? 'turn_on' : 'turn_off', {
      entity_id: device.entityId
    });
  }

  // await callService(user, 'climate', on ? 'turn_on' : 'turn_off', {
  //   entity_id: device.entityId
  // });

  // await setDeviceStatusProp(deviceId, 'on', on);

  state.on = on;

  const result = createCommand(deviceId, state);

  console.log('action.devices.commands.OnOff on', state);

  return result;
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

  const thermostatMode =
    parms.thermostatMode === 'on' ? 'heat' : parms.thermostatMode;

  await callService(user, 'climate', 'set_hvac_mode', {
    entity_id: device.entityId,
    hvac_mode: thermostatMode
  });

  // await setDeviceStatusProp(deviceId, 'thermostatMode', thermostatMode);

  state.thermostatMode = thermostatMode;

  const result = createCommand(deviceId, state);

  console.log(
    'action.devices.commands.ThermostatTemperatureSetpoint set_hvac_mode',
    state
  );

  return result;
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

  // await setDeviceStatusProp(
  //   deviceId,
  //   'thermostatTemperatureSetpoint',
  //   thermostatTemperatureSetpoint
  // );

  state.thermostatTemperatureSetpoint = thermostatTemperatureSetpoint;

  const result = createCommand(deviceId, state);

  console.log(
    'action.devices.commands.ThermostatTemperatureSetpoint set_hvac_mode',
    state
  );

  return result;
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

  const items: Array<{
    deviceId: string;
    execCommand: string;
    params: ApiClientObjectMap<any>;
  }> = [];

  for (const input of body.inputs) {
    for (const command of input.payload.commands) {
      for (const device of command.devices) {
        const deviceId = device.id;
        for (const execution of command.execution) {
          const execCommand = execution.command;
          const params = execution.params;

          items.push({
            deviceId,
            execCommand,
            params
          });

          // if (execCommand in commandMap) {
          //   payload.commands.push(commandMap[execCommand](user, deviceId, params));
          // } else {
          //   console.error('Unkndow Command', execCommand, params);
          // }
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
