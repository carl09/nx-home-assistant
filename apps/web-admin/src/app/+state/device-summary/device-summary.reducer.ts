import { Action, createReducer, on } from '@ngrx/store';
import { loadDeviceSummary } from './device-summary.actions';
import { DeviceSummaryState } from './device-summary.models';

const initialState: DeviceSummaryState = {
  ids: [],
  entities: {}
};

const reducer = createReducer(
  initialState,
  on(loadDeviceSummary, (_state, { devices }) => {
    return {
      ids: devices.map(x => x.entity_id),
      entities: devices.reduce((acc, d) => {
        acc[d.entity_id] = d;
        return acc;
      }, {})
    };
  })
);

export function deviceSummaryReducer(
  state: DeviceSummaryState,
  action: Action
) {
  return reducer(state, action);
}
