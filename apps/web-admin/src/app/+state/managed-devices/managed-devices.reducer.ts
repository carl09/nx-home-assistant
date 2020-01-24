import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IManagedDeviceModel } from '@nx-home-assistant/common';
import * as ManagedDevicesActions from './managed-devices.actions';

export interface State extends EntityState<IManagedDeviceModel> {
  selectedId?: string; // which Devices record has been selected
  loaded: boolean; // has the Devices list been loaded
  error?: string | null; // last none error (if any)
}

export const selectEntityId = (a: IManagedDeviceModel): string => {
  return a.id;
};

export const sortById = (
  a: IManagedDeviceModel,
  b: IManagedDeviceModel
): number => {
  return a.id.localeCompare(b.id);
};

export const managedDevicesAdapter: EntityAdapter<
  IManagedDeviceModel
> = createEntityAdapter<IManagedDeviceModel>({
});

export const initialState: State = managedDevicesAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const managedDevicesReducer = createReducer(
  initialState,
  // on(DevicesActions.loadDevices, state => ({
  //   ...state,
  //   loaded: false,
  //   error: null
  // })),
  on(ManagedDevicesActions.loadManagedDevicesSuccess, (state, { devices }) =>
    managedDevicesAdapter.setAll(devices, { ...state, loaded: true })
  )
  // on(DevicesActions.loadDevicesFailure, (state, { error }) => ({
  //   ...state,
  //   error
  // })),
  // on(DevicesActions.loadDevicesSelected, (state, { entity_id }) => ({
  //   ...state,
  //   selectedId: entity_id
  // }))
);

export function reducer(state: State | undefined, action: Action) {
  return managedDevicesReducer(state, action);
}
