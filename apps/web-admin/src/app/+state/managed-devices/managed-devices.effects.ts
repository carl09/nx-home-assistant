import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IManagedDeviceModel } from '@nx-home-assistant/common';
import { tap, withLatestFrom } from 'rxjs/operators';
import { ManagedDevicesService } from '../../services/managed-devices.service';
import * as ManagedDevicesActions from './managed-devices.actions';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../store';
import { getDeviceSummaryEntities } from '../selectors';

@Injectable()
export class ManagedDevicesEffects {
  upsertManagedDevice$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ManagedDevicesActions.updateManagedDevicesRequest),
        withLatestFrom(this.store.pipe(select(getDeviceSummaryEntities))),
        tap(([action, entities]) => {
          const dbModel: IManagedDeviceModel = {
            deviceType: action.device.deviceType,
            entityId: action.device.entityId,
            localId: action.device.localId,
            name: action.device.name,
            traits: action.device.traits,
            id: action.device.id,
            device: entities[action.device.entityId]
          };

          this.managedDevicesService.updateManagedDevice(dbModel);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private managedDevicesService: ManagedDevicesService,
    private store: Store<IRootState>
  ) {}
}
