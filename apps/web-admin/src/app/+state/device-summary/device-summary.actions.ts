import { createAction, props } from '@ngrx/store';
import {
  IHomeAssistantDeviceSummary
} from '@nx-home-assistant/common';

export const loadDeviceSummary = createAction(
  '[Managed Devices] Load Devices Summary',
  props<{ devices: IHomeAssistantDeviceSummary[] }>()
);
