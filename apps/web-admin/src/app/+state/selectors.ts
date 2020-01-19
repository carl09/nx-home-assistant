import { createSelector } from '@ngrx/store';
import { State as deviceState } from './devices/devices.reducer';
import { IRootState } from './store';

// Lookup the 'Devices' feature state managed by NgRx
// export const getDevicesState = createFeatureSelector<
// IDeviceReducer,
//   State
// >();

export const getDevicesState = (state: IRootState) => state.devices;

// const { selectAll, selectEntities } = devicesAdapter.getSelectors();

// export const getDevicesLoaded = createSelector(
//   getDevicesState,
//   (state: State) => state.loaded
// );

// export const getDevicesError = createSelector(
//   getDevicesState,
//   (state: State) => state.error
// );

// export const getAllDevices = createSelector(
//   getDevicesState,
//   (state: State) => selectAll(state)
// );

// export const getDevicesEntities = createSelector(
//   getDevicesState,
//   (state: State) => selectEntities(state)
// );

export const getSelectedId = createSelector(
  getDevicesState,
  (state: deviceState) => state.selectedId
);

// export const getSelected = createSelector(
//   getDevicesEntities,
//   getSelectedId,
//   (entities, selectedId) => selectedId && entities[selectedId]
// );
