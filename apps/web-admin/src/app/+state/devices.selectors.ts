import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DEVICES_FEATURE_KEY,
  State,
  DevicesPartialState,
  devicesAdapter
} from './devices.reducer';

// Lookup the 'Devices' feature state managed by NgRx
export const getDevicesState = createFeatureSelector<
  DevicesPartialState,
  State
>(DEVICES_FEATURE_KEY);

const { selectAll, selectEntities } = devicesAdapter.getSelectors();

export const getDevicesLoaded = createSelector(
  getDevicesState,
  (state: State) => state.loaded
);

export const getDevicesError = createSelector(
  getDevicesState,
  (state: State) => state.error
);

export const getAllDevices = createSelector(
  getDevicesState,
  (state: State) => selectAll(state)
);

export const getDevicesEntities = createSelector(
  getDevicesState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getDevicesState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getDevicesEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
