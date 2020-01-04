export interface IDeviceModel {
  name: string;
  localId: string;
  entityId: string;
  uid: string;
  deviceType: string;
  traits: string[];
}

export interface IDeviceModelEdit extends IDeviceModel {
  id: string;
}

export interface IHomeAssistantEntityAttributes {
  friendly_name: string;
  hidden: boolean;
  icon: string;
  [key: string]: any;
}

export interface IHomeAssistantEntity {
  state: string;
  entity_id: string;
  last_changed: Date;
  last_updated: Date;
  attributes: IHomeAssistantEntityAttributes;
}

export interface IGoogleHomeOn {
  on: boolean;
}

export interface IGoogleHomeTemperatureSetting {
  thermostatMode: string;
  thermostatTemperatureSetpoint: number;
  thermostatTemperatureAmbient: number;
  thermostatTemperatureSetpointHigh: number;
  thermostatTemperatureSetpointLow: number;
  thermostatHumidityAmbient: number;
}

export interface IDeviceType {
  code: string;
  name: string;
  attributes?: { [key: string]: string };
  traits: string[];
}

export interface CustomSmartHomeV1SyncDevices {
  id: string;
  type: string;
  traits: string[];
  name: {
    defaultNames: string[];
    name: string;
    nicknames: string[];
  };
  willReportState: boolean;
  deviceInfo?: {
    manufacturer: string;
    model: string;
    hwVersion: string;
    swVersion: string;
  };
  attributes?: { [key: string]: any };
  customData?: { [key: string]: any };
  roomHint?: string;
  otherDeviceIds?: Array<{
    agentId?: string;
    deviceId: string;
  }>;
}

export const deviceTypes: IDeviceType[] = [
  {
    code: 'action.devices.types.CAMERA',
    name: 'Camera',
    attributes: {
      cameraStreamSupportedProtocols: 'array',
      cameraStreamNeedAuthToken: 'boolean',
      cameraStreamNeedDrmEncryption: 'boolean'
    },
    traits: ['action.devices.traits.CameraStream']
    // cameraStreamSupportedProtocols: ['hls', 'dash'],
    // cameraStreamNeedAuthToken: true,
    // cameraStreamNeedDrmEncryption: false
  },
  {
    code: 'action.devices.types.THERMOSTAT',
    name: 'Thermostat',
    traits: ['action.devices.traits.TemperatureSetting']
    // availableThermostatModes: 'off,heat,cool,on',
    // thermostatTemperatureUnit: 'F'
  },
  {
    code: 'action.devices.types.SWITCH',
    name: 'Switch',
    traits: ['action.devices.traits.OnOff']
  },
  {
    code: 'action.devices.types.SPEAKER',
    name: 'Speaker',
    traits: ['action.devices.traits.Volume']
  },
  {
    code: 'action.devices.types.LIGHT',
    name: 'Light',
    traits: ['action.devices.traits.OnOff']
  },
  {
    code: 'action.devices.types.FAN',
    name: 'Fan',
    traits: ['action.devices.traits.OnOff']
  },
  {
    code: 'action.devices.types.MICROWAVE',
    name: 'Microwave',
    traits: ['action.devices.traits.OnOff']
  },
  {
    code: 'action.devices.types.COFFEE_MAKER',
    name: 'Coffee Maker',
    traits: ['action.devices.traits.OnOff']
  }
];

// COFFEE_MAKER 

export const deviceTraits: string[] = [
  'action.devices.traits.CameraStream',
  'action.devices.traits.TemperatureSetting',
  'action.devices.traits.OnOff',
  'action.devices.traits.Volume'
];
