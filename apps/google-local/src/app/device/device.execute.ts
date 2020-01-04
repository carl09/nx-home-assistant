import { SmartHomeV1ExecuteResponseCommands } from 'actions-on-google';
import axios from 'axios';

const post = async <T>(
  url: string,
  token: string | undefined,
  body: { [key: string]: string }
) => {
  const var1 = JSON.stringify(body);

  console.log('post body:', var1);

  const res = await axios(url, {
    method: 'post',
    data: body,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  return res.data as T;
};

const callService = (
  token: string,
  domain: string,
  service: string,
  data: { [key: string]: string }
) => {
  return post<{}>(
    `http://hassio/homeassistant/api/services/${domain}/${service}`,
    token,
    data
  );
};

const commandMap: {
  [command: string]: (
    token: string,
    entityId: string,
    parms: {
      [key: string]: any;
    }
  ) => Promise<SmartHomeV1ExecuteResponseCommands>;
} = {};

const createCommand = (
  id: string,
  status: any
): SmartHomeV1ExecuteResponseCommands => ({
  ids: [id],
  status: 'SUCCESS',
  states: status
});

commandMap['action.devices.commands.OnOff'] = async (
  token: string,
  entityId: string,
  parms: {
    [key: string]: any;
  }
): Promise<SmartHomeV1ExecuteResponseCommands> => {
  const on: boolean = parms.on;

  if (entityId.startsWith('climate')) {
    await callService(token, 'climate', on ? 'turn_on' : 'turn_off', {
      entity_id: entityId
    });
  } else {
    await callService(token, 'switch', on ? 'turn_on' : 'turn_off', {
      entity_id: entityId
    });
  }

  // await setDeviceStatusProp(deviceId, 'on', on);
  const state = {
    on
  };

  const result = createCommand(entityId, state);

  console.log('action.devices.commands.OnOff on', state);

  return result;
};

commandMap['action.devices.commands.ThermostatSetMode'] = async (
  token: string,
  entityId: string,
  parms: {
    [key: string]: any;
  }
): Promise<SmartHomeV1ExecuteResponseCommands> => {
  const thermostatMode =
    parms.thermostatMode === 'on' ? 'heat' : parms.thermostatMode;

  await callService(token, 'climate', 'set_hvac_mode', {
    entity_id: entityId,
    hvac_mode: thermostatMode
  });

  const state = {
    thermostatMode
  };

  const result = createCommand(entityId, state);

  console.log(
    'action.devices.commands.ThermostatTemperatureSetpoint set_hvac_mode',
    state
  );

  return result;
};

commandMap['action.devices.commands.ThermostatTemperatureSetpoint'] = async (
  token: string,
  entityId: string,
  parms: {
    [key: string]: any;
  }
): Promise<SmartHomeV1ExecuteResponseCommands> => {
  const thermostatTemperatureSetpoint = parms.thermostatTemperatureSetpoint;

  await callService(token, 'climate', 'set_temperature', {
    entity_id: entityId,
    temperature: thermostatTemperatureSetpoint
    // hvac_mode: state.thermostatMode
  });

  const state = {
    thermostatTemperatureSetpoint
  };

  const result = createCommand(entityId, state);

  console.log(
    'action.devices.commands.ThermostatTemperatureSetpoint set_hvac_mode',
    state
  );

  return result;
};

export const execute = (
  cmd: string,
  token: string,
  entityId: string,
  parms: {
    [key: string]: any;
  }
) => {
  if (cmd in commandMap) {
    return commandMap[cmd](token, entityId, parms);
  }

  console.error(`can't find ${cmd}`);
};
