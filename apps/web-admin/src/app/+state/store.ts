import { Type } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { DeviceSummaryEffects } from './device-summary/device-summary.effects';
import { DeviceSummaryState } from './device-summary/device-summary.models';
import { deviceSummaryReducer } from './device-summary/device-summary.reducer';
import { DevicesEffects } from './devices/devices.effects';
import {
  reducer as deviceReducer,
  State as deviceState
} from './devices/devices.reducer';
import { ManagedDevicesEffects } from './managed-devices/managed-devices.effects';
import {
  reducer as managedDevicesReducer,
  State as managedDevicesState
} from './managed-devices/managed-devices.reducer';

export interface IRootState {
  devices: deviceState;
  managedDevices: managedDevicesState;
  deviceSummary: DeviceSummaryState;
}

export const reducers: ActionReducerMap<IRootState> = {
  devices: deviceReducer,
  managedDevices: managedDevicesReducer,
  deviceSummary: deviceSummaryReducer
};

export const effects: Array<Type<any>> = [
  DevicesEffects,
  ManagedDevicesEffects,
  DeviceSummaryEffects
];
