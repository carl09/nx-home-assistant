import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IHomeAssistantEntityStatus } from '@nx-home-assistant/common';
import * as DevicesActions from './devices.actions';
// import { DevicesEntity } from './devices.models';

export const DEVICES_FEATURE_KEY = 'devices';

export interface State extends EntityState<IHomeAssistantEntityStatus> {
  selectedId?: string; // which Devices record has been selected
  loaded: boolean; // has the Devices list been loaded
  error?: string | null; // last none error (if any)
}

export interface DevicesPartialState {
  readonly [DEVICES_FEATURE_KEY]: State;
  // readonly devices: State;
}

export interface IDeviceReducer extends ActionReducer<State, Action> {}

export const selectEntityId = (a: IHomeAssistantEntityStatus): string => {
  return a.entity_id;
};

export const sortById = (
  a: IHomeAssistantEntityStatus,
  b: IHomeAssistantEntityStatus
): number => {
  return a.entity_id.localeCompare(b.entity_id);
};

export const devicesAdapter: EntityAdapter<
IHomeAssistantEntityStatus
> = createEntityAdapter<IHomeAssistantEntityStatus>({
  selectId: selectEntityId,
  sortComparer: sortById
});

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
    devicesAdapter.setAll(devices, { ...state, loaded: true })
  ),
  on(DevicesActions.loadDevicesFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(DevicesActions.loadDevicesSelected, (state, { entity_id }) => ({
    ...state,
    selectedId: entity_id
  })),
  on(DevicesActions.updateDevices, (state, { device }) =>
    devicesAdapter.upsertOne(device, state)
  )
);

export function reducer(state: State | undefined, action: Action) {
  return devicesReducer(state, action);
}
