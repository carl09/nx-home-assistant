import {
  CustomSmartHomeV1SyncDevices,
  IDeviceModel,
  IGoogleHomeOn,
  IGoogleHomeTemperatureSetting,
  IHomeAssistantEntity
} from './device.model';

export interface ITransforms {
  query: (device: IDeviceModel, entity: IHomeAssistantEntity) => any;
  sync: (device: IDeviceModel, entity: IHomeAssistantEntity) => any;
}

const getOn = (
  device: IDeviceModel,
  entity: IHomeAssistantEntity
): IGoogleHomeOn => {
  if (device.deviceType === 'action.devices.types.THERMOSTAT') {
    return {
      on: entity.state !== 'off'
    };
  }
  return {
    on: entity.state !== 'off'
  };
};

const syncOn = (_device: IDeviceModel, _entity: IHomeAssistantEntity): any => {
  return {
    commandOnlyOnOff: false
  };
};

const getTemperatureSetting = (
  _device: IDeviceModel,
  entity: IHomeAssistantEntity
): IGoogleHomeTemperatureSetting => {
  return {
    thermostatMode: entity.state,
    thermostatTemperatureSetpoint: entity.attributes.temperature,
    thermostatTemperatureAmbient: entity.attributes.current_temperature,
    thermostatTemperatureSetpointHigh: entity.attributes.temperature,
    thermostatTemperatureSetpointLow: entity.attributes.min_temp,
    thermostatHumidityAmbient: entity.attributes.humidity
  };
};

const syncTemperatureSetting = (
  _device: IDeviceModel,
  _entity: IHomeAssistantEntity
): any => {
  return {
    availableThermostatModes: 'heat,cool',
    thermostatTemperatureUnit: 'C',
    commandOnlyTemperatureSetting: false,
    queryOnlyTemperatureSetting: false
  };
};

const transforms: { [key: string]: ITransforms } = {
  'action.devices.traits.TemperatureSetting': {
    query: getTemperatureSetting,
    sync: syncTemperatureSetting
  },
  'action.devices.traits.OnOff': {
    query: getOn,
    sync: syncOn
  }
};

export const getTransforms = (traits: string[]): ITransforms[] => {
  return traits.map(x => {
    return transforms[x];
  });
};

// const customData: {
//   localEntityId?: string;
// } = {};

export const createSyncDevice = (
  id: string,
  device: IDeviceModel,
  entity: IHomeAssistantEntity
): CustomSmartHomeV1SyncDevices => {
  const syncDevices: CustomSmartHomeV1SyncDevices = {
    id,
    type: device.deviceType,
    traits: device.traits,
    name: {
      defaultNames: [device.name],
      name: device.name,
      nicknames: []
    },
    willReportState: true,
    deviceInfo: {
      manufacturer: 'Acme Co',
      model: 'acme-washer',
      hwVersion: '1.0',
      swVersion: '1.0.1'
    },
    attributes: {},
    customData: {},
    otherDeviceIds: []
  };

  const trans = getTransforms(device.traits);

  syncDevices.attributes = trans.reduce((acc, t) => {
    if (t) {
      const result = t.sync(device, entity);

      Object.keys(result).map(x => {
        if (result[x] !== undefined) {
          acc[x] = result[x];
        }
      });
    }

    return acc;
  }, syncDevices.attributes || {});

  if (syncDevices.otherDeviceIds) {
    if (device.localId) {
      syncDevices.otherDeviceIds.push({
        deviceId: device.localId
      });
    }

    if (device.entityId) {
      syncDevices.otherDeviceIds.push({
        deviceId: device.entityId
      });
      if (syncDevices.customData) {
        syncDevices.customData.localEntityId = device.entityId;
      }
    }
  }

  return syncDevices;
};
