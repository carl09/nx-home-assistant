import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  createQueryDevice,
  createSyncDevice,
  CustomSmartHomeV1SyncDevices,
  IHomeAssistantEntityStatus,
  IManagedDeviceModel
} from '@nx-home-assistant/common';
import { combineLatest, EMPTY, Observable, ReplaySubject } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { getDevice } from '../../+state/selectors';
import { IRootState } from '../../+state/store';

@Component({
  selector: 'nx-home-assistant-managed-view',
  templateUrl: './managed-view.component.html',
  styleUrls: ['./managed-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagedViewComponent implements OnInit, OnChanges {
  @Input() id: string;

  device$: Observable<IManagedDeviceModel>;

  entity$: Observable<IHomeAssistantEntityStatus>;
  sync$: Observable<CustomSmartHomeV1SyncDevices>;

  query$: Observable<any>;

  private entityId$: ReplaySubject<string> = new ReplaySubject(1);

  constructor(private store: Store<IRootState>) {
    console.log('[ManagedViewComponent] ctor');
    this.device$ = this.entityId$.asObservable().pipe(
      tap(x => console.log('route.params', x)),
      switchMap(id => {
        return this.store.pipe(
          select(y => y.managedDevices),
          map(x => x.entities[id])
        );
      }),
      tap(x => console.log('device$', x)),
      shareReplay()
    );

    this.entity$ = this.device$.pipe(
      switchMap(x => {
        if (!x) {
          return EMPTY;
        }
        return this.store.pipe(select(y => getDevice(y.devices, x.entityId)));
      }),
      tap(x => console.log('entity$', x)),
      shareReplay()
    );

    this.sync$ = combineLatest([this.device$, this.entity$]).pipe(
      map(([managedDevice, device]) => {
        if (device && managedDevice) {
          return createSyncDevice(managedDevice.id, managedDevice, device);
        }
        return undefined;
      }),
      tap(x => console.log('sync$', x))
    );

    this.query$ = combineLatest([this.device$, this.entity$]).pipe(
      map(([managedDevice, device]) => {
        if (device && managedDevice) {
          return createQueryDevice(managedDevice, device);
        }
        return undefined;
      }),
      tap(x => console.log('query$', x))
    );

    // const deviceStatus = createQueryDevice(device.model.traits, entity);
  }

  ngOnInit(): void {
    console.log('[ManagedViewComponent] ngOnInit');

    this.entityId$.next(this.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.id) {
      this.entityId$.next(changes.id.currentValue);
    }
  }
}
