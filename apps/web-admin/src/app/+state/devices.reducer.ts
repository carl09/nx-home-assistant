import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as DevicesActions from './devices.actions';
import { DevicesEntity } from './devices.models';

export const DEVICES_FEATURE_KEY = 'devices';

export interface State extends EntityState<DevicesEntity> {
  selectedId?: string | number; // which Devices record has been selected
  loaded: boolean; // has the Devices list been loaded
  error?: string | null; // last none error (if any)
}

export interface DevicesPartialState {
  readonly [DEVICES_FEATURE_KEY]: State;
}

export const devicesAdapter: EntityAdapter<DevicesEntity> = createEntityAdapter<
  DevicesEntity
>();

export const initialState: State = devicesAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const devicesReducer = createReducer(
  initialState,
  on(DevicesActions.loadDevices, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(DevicesActions.loadDevicesSuccess, (state, { devices }) =>
    devicesAdapter.addAll(devices, { ...state, loaded: true })
  ),
  on(DevicesActions.loadDevicesFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return devicesReducer(state, action);
}
