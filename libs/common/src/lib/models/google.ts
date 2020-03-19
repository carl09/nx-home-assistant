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

export interface DeviceStatus {
  online: boolean;
  [key: string]: any;
}

export interface ThermostatDeviceStatus extends DeviceStatus {
  thermostatMode: string;
  thermostatTemperatureSetpoint: number;
  thermostatTemperatureAmbient?: number;
  thermostatHumidityAmbient?: number;
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
