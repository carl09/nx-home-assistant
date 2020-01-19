import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import * as DevicesActions from './devices.actions';
import * as fromDevices from './devices.reducer';

@Injectable()
export class DevicesEffects {
  loadDevices$ = createEffect(() =>
    this.dataPersistence.fetch(DevicesActions.loadDevices, {
      run: (
        action: ReturnType<typeof DevicesActions.loadDevices>,
        state: fromDevices.DevicesPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return DevicesActions.loadDevicesSuccess({ devices: [] });
      },

      onError: (
        action: ReturnType<typeof DevicesActions.loadDevices>,
        error
      ) => {
        console.error('Error', error);
        return DevicesActions.loadDevicesFailure({ error });
      }
    })
  );

  constructor(
    private dataPersistence: DataPersistence<fromDevices.DevicesPartialState>
  ) {}
}
