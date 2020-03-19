import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {
  createQueryDevice,
  createSyncDevice,
  CustomSmartHomeV1SyncDevices,
  IHomeAssistantEntityStatus,
  IManagedDeviceModel,
  namedLog
} from '@nx-home-assistant/common';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { getDevice } from '../+state/selectors';
import { IRootState } from '../+state/store';

const log = namedLog('ManagedViewComponent');

@Component({
  selector: 'nx-home-assistant-managed-view',
  templateUrl: './managed-view.component.html',
  styleUrls: ['./managed-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagedViewComponent {
  device$: Observable<IManagedDeviceModel>;

  entity$: Observable<IHomeAssistantEntityStatus>;
  sync$: Observable<CustomSmartHomeV1SyncDevices>;

  query$: Observable<any>;

  constructor(private route: ActivatedRoute, private store: Store<IRootState>) {
    log.info('[ManagedViewComponent] ctor');

    const entityId$ = this.route.params.pipe(
      map((params: ParamMap) => {
        log.info('entityId$', params);
        return params['id'] as string;
      })
    );

    this.device$ = entityId$.pipe(
      tap(id => {
        log.info('route.params', id);
      }),
      switchMap(id => {
        return this.store.pipe(
          select(y => y.managedDevices),
          map(x => x.entities[id])
        );
      }),
      tap(x => log.info('device$', x)),
      shareReplay()
    );

    this.entity$ = this.device$.pipe(
      switchMap(x => {
        if (!x) {
          return EMPTY;
        }
        return this.store.pipe(select(y => getDevice(y.devices, x.entityId)));
      }),
      tap(x => log.info('entity$', x)),
      shareReplay()
    );

    this.sync$ = combineLatest([this.device$, this.entity$]).pipe(
      map(([managedDevice, device]) => {
        if (device && managedDevice) {
          return createSyncDevice(managedDevice.id, managedDevice, device);
        }
        return undefined;
      }),
      tap(x => log.info('sync$', x))
    );

    this.query$ = combineLatest([this.device$, this.entity$]).pipe(
      map(([managedDevice, device]) => {
        if (device && managedDevice) {
          return createQueryDevice(managedDevice, device);
        }
        return undefined;
      }),
      tap(x => log.info('query$', x))
    );
  }
}
