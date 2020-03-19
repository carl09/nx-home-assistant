import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {
  IManagedDeviceModel,
  namedLog
} from '@nx-home-assistant/common';
import { isEqual } from 'lodash';
import { EMPTY, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import {
  deleteManagedDevicesRequest,
  updateManagedDevicesRequest
} from '../+state/managed-devices/managed-devices.actions';
import { getDeviceList } from '../+state/selectors';
import { IRootState } from '../+state/store';
import { IOption } from '../models/options.model';

const log = namedLog('ManagedEditComponent');

@Component({
  selector: 'nx-home-assistant-managed-edit',
  templateUrl: './managed-edit.component.html',
  styleUrls: ['./managed-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagedEditComponent implements OnInit, OnChanges {
  device$: Observable<IManagedDeviceModel>;
  entitiesGrouped$: Observable<IOption[]>;

  private entityId$: Observable<string>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store<IRootState>,
    private readonly router: Router
  ) {
    this.entityId$ = this.route.params.pipe(
      map((params: ParamMap) => {
        log.info('entityId$', params);
        return params['id'] as string;
      })
    );

    this.device$ = this.entityId$.pipe(
      tap(x => log.info('route.params', x)),
      switchMap(id => {
        if (id) {
          return this.store.pipe(
            select(y => y.managedDevices),
            map(x => x.entities[id])
          );
        }
        return EMPTY;
      })
    );

    this.entitiesGrouped$ = this.store.pipe(
      select(x => getDeviceList(x.devices)),
      distinctUntilChanged((x, y) => isEqual(x, y)),
    );
  }

  ngOnInit(): void {}

  ngOnChanges(_changes: SimpleChanges): void {}

  public onSave(event: IManagedDeviceModel) {
    log.info('[ManagedEditComponent] onSave', event);
    const action = updateManagedDevicesRequest({ device: event });
    this.store.dispatch(action);
    this.router.navigate(['list']);
  }

  public onCancel() {
    log.info('[ManagedEditComponent] onCancel');
    this.router.navigate(['list']);
  }

  public onDelete(event) {
    log.info('[ManagedEditComponent] onDelete', event);
    const action = deleteManagedDevicesRequest({ id: event });
    this.store.dispatch(action);
    this.router.navigate(['list']);
  }
}
