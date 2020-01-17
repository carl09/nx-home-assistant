import { createAction, props } from '@ngrx/store';
import { DevicesEntity } from './devices.models';

export const loadDevices = createAction('[Devices] Load Devices');

export const loadDevicesSuccess = createAction(
  '[Devices] Load Devices Success',
  props<{ devices: DevicesEntity[] }>()
);

export const loadDevicesFailure = createAction(
  '[Devices] Load Devices Failure',
  props<{ error: any }>()
);
