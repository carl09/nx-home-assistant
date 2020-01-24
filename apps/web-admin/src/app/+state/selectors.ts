import { createSelector } from '@ngrx/store';
import {
  devicesAdapter,
  State as deviceState
} from './devices/devices.reducer';
import { managedDevicesAdapter } from './managed-devices/managed-devices.reducer';
import { IRootState } from './store';

export const getDevicesState = (state: IRootState) => state.devices;

export const getDevicesSummary = (state: IRootState) => state.deviceSummary;

const { selectAll, selectEntities } = devicesAdapter.getSelectors();
const managedDevicesEntities = managedDevicesAdapter.getSelectors()
  .selectEntities;
const managedDevicesSelectAll = managedDevicesAdapter.getSelectors().selectAll;

export const getDevice = createSelector(
  selectEntities,
  (state, entityId: string) => state[entityId]
);

export const getManagedDevice = createSelector(
  managedDevicesEntities,
  (state, entityId: string) => state[entityId]
);

export const getAllManagedDevices = createSelector(
  managedDevicesSelectAll,
  state => state
);

export const getDeviceList = createSelector(selectAll, state => {
  return state.map(x => {
    return {
      entity_id: x.entity_id,
      title: x.attributes.friendly_name || x.entity_id
    };
  });
});

export const getSelectedId = createSelector(
  getDevicesState,
  (state: deviceState) => state.selectedId
);

export const getDeviceSummaryEntities = createSelector(
  getDevicesSummary,
  state => state.entities
);
