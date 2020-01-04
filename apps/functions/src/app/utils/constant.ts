import axios from 'axios';

export const globalDeviceId = 'ac-unit';
export const globalAgentUserId = 'fedf0bfd-5e8b-422c-8886-04bf293dde9f';

// Home Graph Testing
// https://smarthome-test-suite.appspot.com/

// Array could be of any type
// tslint:disable-next-line
export const asyncForEach = async (array: any[], callback: Function) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const get = async <T>(url: string, token?: string) => {
  const res = await axios.get(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  return res.data as T;
};

export const post = async <T>(
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

// Sensor Bro
// TemperatureSetting
// Ok Google. Set the Sensor Bro to 20 degrees‣
// AssertionError: Expected state to include: {"thermostatTemperatureSetpoint":20}, actual state: {"thermostatMode":"cool","thermostatTemperatureSetpoint":22,"thermostatTemperatureAmbient":23,"thermostatTemperatureSetpointHigh":22,"thermostatTemperatureSetpointLow":18,"thermostatHumidityAmbient":0,"activeThermostatMode":"","online":true}: expected false to be true
// Ok Google. Set the Sensor Bro to 30 degrees‣
// AssertionError: Expected state to include: {"thermostatTemperatureSetpoint":30}, actual state: {"thermostatMode":"off","thermostatTemperatureSetpoint":20,"thermostatTemperatureAmbient":23,"thermostatTemperatureSetpointHigh":20,"thermostatTemperatureSetpointLow":18,"thermostatHumidityAmbient":0,"activeThermostatMode":"","online":true}: expected false to be true
// Ok Google. Change the Sensor Bro to heat mode‣
// AssertionError: Expected state to include: {"thermostatMode":"heat"}, actual state: {"online":true,"thermostatMode":"off","thermostatTemperatureSetpoint":20,"thermostatTemperatureAmbient":23,"thermostatTemperatureSetpointHigh":20,"thermostatTemperatureSetpointLow":18,"thermostatHumidityAmbient":0,"activeThermostatMode":""}: expected false to be true
// Ok Google. Change the Sensor Bro to cool mode‣
// AssertionError: Expected state to include: {"thermostatMode":"cool"}, actual state: {"online":true,"thermostatMode":"off","thermostatTemperatureSetpoint":20,"thermostatTemperatureAmbient":23,"thermostatTemperatureSetpointHigh":20,"thermostatTemperatureSetpointLow":18,"thermostatHumidityAmbient":0,"activeThermostatMode":""}: expected false to be true
// Ok Google. Change the Sensor Bro to off mode10363ms‣
// Ok Google. Change the Sensor Bro to on mode‣
// AssertionError: Expected state to include: {"thermostatMode":"cool"}, actual state: {"thermostatMode":"off","thermostatTemperatureSetpoint":20,"thermostatTemperatureAmbient":23,"thermostatTemperatureSetpointHigh":20,"thermostatTemperatureSetpointLow":18,"thermostatHumidityAmbient":0,"activeThermostatMode":"","online":true}: expected false to be true
// Request Sync
// Check HomeGraph devices after adding/removing/updating a device249453ms
