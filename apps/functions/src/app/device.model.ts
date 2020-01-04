
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


// export const commandOnOff = (deviceId: string, toggle: boolean) => {
//   return firebaseRef
//     .child(deviceId)
//     .child('OnOff')
//     .update({
//       on: toggle
//     });
// };

// export const commandSetThermostatMode = (
//   deviceId: string,
//   thermostatMode: string
// ) => {
//   return firebaseRef
//     .child(deviceId)
//     .child('ThermostatMode')
//     .update({
//       thermostatMode
//     });
// };

// export const commandSetTemperature = (
//   deviceId: string,
//   temperature: number
// ) => {
//   return firebaseRef
//     .child(deviceId)
//     .child('ThermostatMode')
//     .update({
//       temperature
//     });
// };

// export const commandSetFanSpeed = (deviceId: string, fanSpeed: string) => {
//   return firebaseRef
//     .child(deviceId)
//     .child('ThermostatMode')
//     .update({
//       fanSpeed
//     });
// };
