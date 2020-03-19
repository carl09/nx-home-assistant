import { createAction, props } from '@ngrx/store';
import { IManagedDeviceModel } from '@nx-home-assistant/common';

export const loadManagedDevicesSuccess = createAction(
  '[Managed Devices] Load Managed Devices Success',
  props<{ devices: IManagedDeviceModel[] }>()
);

export const updateManagedDevicesRequest = createAction(
  '[Managed Devices] Update Managed Devices Request',
  props<{ device: IManagedDeviceModel }>()
);


export const deleteManagedDevicesRequest = createAction(
  '[Managed Devices] Delete Managed Devices Request',
  props<{ id: string }>()
);


export const managedDevicesSelected = createAction(
  '[Devices] Managed Devices Selected',
  props<{ id: string }>()
);
