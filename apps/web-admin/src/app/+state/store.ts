import { ActionReducerMap } from '@ngrx/store';
import {
  reducer as deviceReducer,
  State as deviceState
} from './devices/devices.reducer';

export interface IRootState {
  devices: deviceState;
}

export const reducers: ActionReducerMap<IRootState> = {
  devices: deviceReducer
};
