import { createAction, props } from '@ngrx/store';
import { IHomeAssistantEntityStatus } from '@nx-home-assistant/common';

export const loadDevices = createAction('[Devices] Load Devices');

export const loadDevicesSuccess = createAction(
  '[Devices] Load Devices Success',
  props<{ devices: IHomeAssistantEntityStatus[] }>()
);

export const loadDevicesFailure = createAction(
  '[Devices] Load Devices Failure',
  props<{ error: any }>()
);

export const loadDevicesSelected = createAction(
  '[Devices] Devices Selected',
  props<{ entity_id: string }>()
);

export const updateDevices = createAction(
  '[Devices] Update Devices',
  props<{ device: IHomeAssistantEntityStatus }>()
);
