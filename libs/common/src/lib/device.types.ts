export interface IDeviceType {
  code: string;
  name: string;
  attributes?: { [key: string]: string };
  traits: string[];
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
  },
  {
    code: 'action.devices.types.AC_UNIT',
    name: 'AC Unit',
    traits: []
  }
];

// COFFEE_MAKER

export const deviceTraits: string[] = [
  'action.devices.traits.CameraStream',
  'action.devices.traits.TemperatureSetting',
  'action.devices.traits.OnOff',
  'action.devices.traits.Volume',
  'action.devices.traits.FanSpeed'
];
