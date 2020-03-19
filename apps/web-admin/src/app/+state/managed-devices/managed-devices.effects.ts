import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { IManagedDeviceModel } from '@nx-home-assistant/common';
import { tap, withLatestFrom } from 'rxjs/operators';
import { ManagedDevicesService } from '../../services/managed-devices.service';
import { getDeviceSummaryEntities } from '../selectors';
import { IRootState } from '../store';
import * as ManagedDevicesActions from './managed-devices.actions';

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

  deleteManagedDevice$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ManagedDevicesActions.deleteManagedDevicesRequest),
        tap(action => {
          this.managedDevicesService.deleteManagedDevice(action.id);
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
