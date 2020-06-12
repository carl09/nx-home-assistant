import {
  CustomSmartHomeV1SyncDevices,
  DeviceStatus,
  IGoogleHomeOn,
  IGoogleHomeTemperatureSetting
} from './models/google';
import { IHomeAssistantEntityStatus } from './models/home-assistant-entity';
import { IManagedDeviceModel } from './models/managed-device';

export interface ITransforms {
  query: (
    device: IManagedDeviceModel,
    entity: IHomeAssistantEntityStatus
  ) => any;
  sync: (
    device: IManagedDeviceModel,
    entity: IHomeAssistantEntityStatus
  ) => any;
}

const getOn = (
  device: IManagedDeviceModel,
  entity: IHomeAssistantEntityStatus
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

const syncOn = (
  _device: IManagedDeviceModel,
  _entity: IHomeAssistantEntityStatus
): any => {
  return {
    commandOnlyOnOff: false
  };
};

const getTemperatureSetting = (
  _device: IManagedDeviceModel,
  entity: IHomeAssistantEntityStatus
): IGoogleHomeTemperatureSetting => {
  let thermostatMode = entity.state;

  if (thermostatMode === 'heat_cool') {
    thermostatMode = 'heatcool';
  } else if (thermostatMode === 'fan_only') {
    thermostatMode = 'fan-only';
  }

  return {
    thermostatMode,
    thermostatTemperatureSetpoint: entity.attributes.temperature,
    thermostatTemperatureAmbient: entity.attributes.current_temperature,
    thermostatTemperatureSetpointHigh: entity.attributes.temperature,
    thermostatTemperatureSetpointLow: entity.attributes.min_temp,
    thermostatHumidityAmbient: entity.attributes.humidity
  };
};

const getFanSpeed = (
  _device: IManagedDeviceModel,
  entity: IHomeAssistantEntityStatus
): any => {
  return {
    currentFanSpeedSetting: entity.attributes.fan_mode
  };
};

const getCameraStream = (
  _device: IManagedDeviceModel,
  _entity: IHomeAssistantEntityStatus
): any => {
  return {};
};

const syncFanSpeed = (
  _device: IManagedDeviceModel,
  entity: IHomeAssistantEntityStatus
): any => {
  const defaultResult = {
    availableFanSpeeds: {
      speeds: [],
      ordered: false
    },
    reversible: false,
    commandOnlyFanSpeed: true
  };

  if (entity.entity_id.startsWith('climate')) {
    if (
      entity.attributes.fan_modes &&
      Array.isArray(entity.attributes.fan_modes)
    ) {
      const fan_modes: string[] = entity.attributes.fan_modes;
      defaultResult.availableFanSpeeds.speeds = fan_modes.map(x => {
        return {
          speed_name: x,
          speed_values: {
            speed_synonym: [x],
            lang: 'en'
          }
        };
      });
    }
  }

  return defaultResult;
};

const syncTemperatureSetting = (
  _device: IManagedDeviceModel,
  entity: IHomeAssistantEntityStatus
): any => {
  const defaultResult = {
    availableThermostatModes: 'heat,cool,off',
    thermostatTemperatureUnit: 'C',
    commandOnlyTemperatureSetting: false,
    queryOnlyTemperatureSetting: false
  };

  if (entity.entity_id.startsWith('climate')) {
    if (
      entity.attributes.hvac_modes &&
      Array.isArray(entity.attributes.hvac_modes)
    ) {
      const hvac_modes: string[] = entity.attributes.hvac_modes;

      // defaultResult.availableThermostatModes = (hvac_modes.some(
      //   x => x === 'off'
      // )
      //   ? ['on', ...hvac_modes]
      //   : hvac_modes
      // )
      hvac_modes
        .filter(x => x !== 'off')
        .map(x => {
          switch (x) {
            case 'heat_cool': {
              return 'heatcool';
            }
            case 'fan_only': {
              return 'fan-only';
            }
            default: {
              return x;
            }
          }
        })
        .join(',');
    }
  }
  return defaultResult;
};

const syncCameraStream = (
  _device: IManagedDeviceModel,
  _entity: IHomeAssistantEntityStatus
): any => {
  return {
    cameraStreamSupportedProtocols: ['hls'],
    cameraStreamNeedAuthToken: false,
    cameraStreamNeedDrmEncryption: false
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
  },
  'action.devices.traits.FanSpeed': {
    query: getFanSpeed,
    sync: syncFanSpeed
  },
  'action.devices.traits.CameraStream': {
    query: getCameraStream,
    sync: syncCameraStream
  }
};

export const getTransforms = (traits: string[]): ITransforms[] => {
  return (traits || []).map(x => {
    return transforms[x];
  });
};

export const createQueryDevice = (
  device: IManagedDeviceModel,
  entity: IHomeAssistantEntityStatus
): DeviceStatus => {
  const trans = getTransforms(device.traits);

  const d: DeviceStatus = {
    online: true
  };

  return trans.reduce((acc, t) => {
    const result = t.query(device, entity);

    Object.keys(result).map(x => {
      if (result[x] !== undefined) {
        acc[x] = result[x];
      }
    });

    return acc;
  }, d);
};

export const createSyncDevice = (
  id: string,
  device: IManagedDeviceModel,
  entity: IHomeAssistantEntityStatus
): CustomSmartHomeV1SyncDevices => {
  const deviceInfo = device.device
    ? {
        manufacturer: device.device.manufacturer,
        model: device.device.model,
        hwVersion: undefined,
        swVersion: device.device.sw_version
      }
    : {
        manufacturer: 'Acme Co',
        model: 'acme-washer',
        hwVersion: '1.0',
        swVersion: '1.0.1'
      };

  const syncDevices: CustomSmartHomeV1SyncDevices = {
    id,
    type: device.deviceType,
    traits: device.traits || [],
    name: {
      defaultNames: [device.name],
      name: device.name,
      nicknames: []
    },
    willReportState: true,
    deviceInfo,
    attributes: {},
    customData: {},
    otherDeviceIds: []
  };

  if (entity.attributes.friendly_name) {
    syncDevices.name.defaultNames.push(entity.attributes.friendly_name);
    syncDevices.name.nicknames.push(entity.attributes.friendly_name);
  }

  const trans = getTransforms(device.traits);

  syncDevices.attributes = (trans || []).reduce((acc, t) => {
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
