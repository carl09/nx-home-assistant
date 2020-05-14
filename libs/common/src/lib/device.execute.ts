export type CallService = (
  domain: string,
  service: string,
  data: { [key: string]: string }
) => Promise<any>;

interface CommandResult {
  ids: string[];
  status: string;
  states: any;
}

const commandMap: {
  [command: string]: (
    callService: CallService,
    entityId: string,
    parms: {
      [key: string]: any;
    }
  ) => Promise<CommandResult>;
} = {};

const createCommand = (id: string, status: any): CommandResult => ({
  ids: [id],
  status: 'SUCCESS',
  states: status
});

commandMap['action.devices.commands.OnOff'] = async (
  callService: CallService,
  entityId: string,
  parms: {
    [key: string]: any;
  }
): Promise<any> => {
  // const state = await getDeviceStatus(deviceId);

  const on: boolean = parms.on;

  if (entityId.startsWith('climate')) {
    await callService('climate', on ? 'turn_on' : 'turn_off', {
      entity_id: entityId
    });
    if (on) {
      await callService('climate', 'set_hvac_mode', {
        entity_id: entityId
        // hvac_mode: state.thermostatMode
      });
    }
  } else {
    await callService('switch', on ? 'turn_on' : 'turn_off', {
      entity_id: entityId
    });
  }

  return createCommand(entityId, {
    on
  });
};

commandMap['action.devices.commands.ThermostatSetMode'] = async (
  callService: CallService,
  entityId: string,
  parms: {
    [key: string]: any;
  }
): Promise<CommandResult> => {
  const thermostatMode = parms.thermostatMode;

  await callService('climate', 'set_hvac_mode', {
    entity_id: entityId,
    hvac_mode: thermostatMode
  });

  return createCommand(entityId, {
    thermostatMode
  });
};

commandMap['action.devices.commands.ThermostatTemperatureSetpoint'] = async (
  callService: CallService,
  entityId: string,
  parms: {
    [key: string]: any;
  }
): Promise<CommandResult> => {
  const thermostatTemperatureSetpoint = parms.thermostatTemperatureSetpoint;
  // const state = await getDeviceStatus(deviceId);

  await callService('climate', 'set_temperature', {
    entity_id: entityId,
    temperature: thermostatTemperatureSetpoint
    // hvac_mode: state.thermostatMode
  });

  return createCommand(entityId, {
    thermostatTemperatureSetpoint
  });
};

export const execute = (
  cmd: string,
  callService: CallService,
  entityId: string,
  parms: {
    [key: string]: any;
  }
): Promise<CommandResult> => {
  if (cmd in commandMap) {
    return commandMap[cmd](callService, entityId, parms);
  }

  console.error(`can't find ${cmd}`);
};
