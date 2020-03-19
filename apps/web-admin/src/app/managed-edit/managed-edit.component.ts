import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
  SimpleChanges,
  OnInit,
  OnChanges
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import {
  deviceTraits,
  deviceTypes,
  IManagedDeviceModel,
  namedLog
} from '@nx-home-assistant/common';
import { Observable, EMPTY } from 'rxjs';
import { map, switchMap, tap, distinctUntilChanged } from 'rxjs/operators';
import { IRootState } from '../+state/store';
import { getDeviceList } from '../+state/selectors';
import {
  updateManagedDevicesRequest,
  deleteManagedDevicesRequest
} from '../+state/managed-devices/managed-devices.actions';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { isEqual } from 'lodash';

const log = namedLog('ManagedEditComponent');

interface Entity {
  text: string;
  value: string;
}

interface EntityGroup {
  name: string;
  entities: Entity[];
}

@Component({
  selector: 'nx-home-assistant-managed-edit',
  templateUrl: './managed-edit.component.html',
  styleUrls: ['./managed-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagedEditComponent implements OnInit, OnChanges {
  device$: Observable<IManagedDeviceModel>;
  entitiesGrouped$: Observable<EntityGroup[]>;

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
      map(x => {
        const group: { [key: string]: EntityGroup } = {};
        x.forEach(y => {
          const [type] = y.entity_id.split('.');
          if (!(type in group)) {
            group[type] = {
              name: type,
              entities: []
            };
          }
          group[type].entities.push({
            text: y.title,
            value: y.entity_id
          });
        });

        return Object.keys(group).map(y => group[y]);
      })
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
