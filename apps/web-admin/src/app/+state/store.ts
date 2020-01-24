import { ActionReducerMap } from '@ngrx/store';
import {
  reducer as deviceReducer,
  State as deviceState
} from './devices/devices.reducer';
import {
  reducer as managedDevicesReducer,
  State as managedDevicesState
} from './managed-devices/managed-devices.reducer';
import { DevicesEffects } from './devices/devices.effects';
import { ManagedDevicesEffects } from './managed-devices/managed-devices.effects';
import { DeviceSummaryEffects } from './device-summary/device-summary.effects';
import { Type } from '@angular/core';
import { deviceSummaryReducer } from './device-summary/device-summary.reducer';
import { DeviceSummaryState } from './device-summary/device-summary.models';

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

export const effects: Type<any>[] = [
  DevicesEffects,
  ManagedDevicesEffects,
  DeviceSummaryEffects
];
