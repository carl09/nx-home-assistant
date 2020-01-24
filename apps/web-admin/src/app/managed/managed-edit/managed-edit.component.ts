import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import {
  deviceTraits,
  deviceTypes,
  IManagedDeviceModel
} from '@nx-home-assistant/common';
import { Observable, EMPTY, ReplaySubject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { updateManagedDevicesRequest } from '../../+state/managed-devices/managed-devices.actions';
import { getDeviceList } from '../../+state/selectors';
import { IRootState } from '../../+state/store';

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
  @Input() id: string;

  @Output() cancel: EventEmitter<void> = new EventEmitter();

  device$: Observable<IManagedDeviceModel>;
  entitiesGrouped$: Observable<EntityGroup[]>;
  deviceTypes: Entity[];
  deviceTraits: string[];

  deviceForm: FormGroup;

  private entityId$: ReplaySubject<string> = new ReplaySubject(1);

  constructor(private store: Store<IRootState>) {
    this.device$ = this.entityId$.asObservable().pipe(
      tap(x => console.log('route.params', x)),
      switchMap(id => {
        if (id) {
          return this.store.pipe(
            select(y => y.managedDevices),
            map(x => x.entities[id])
          );
        }
        return EMPTY;
      }),
      tap(x => {
        if (x) {
          this.updateFormValues(x);
        }
        console.log('device$', x);
      })
    );

    this.entitiesGrouped$ = this.store.pipe(
      select(x => getDeviceList(x.devices)),
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
      }),
      // take(1),
      // tap(x => console.log('entitiesGrouped$', x))
    );
  }

  ngOnInit(): void {
    this.deviceForm = new FormGroup({
      name: new FormControl(''),
      entityId: new FormControl(''),
      deviceType: new FormControl(''),
      localId: new FormControl(''),
      traits: new FormControl()
    });

    this.deviceTypes = deviceTypes.map(x => {
      return {
        value: x.code,
        text: x.name
      };
    });

    this.deviceTraits = deviceTraits;

    this.entityId$.next(this.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.id) {
      this.entityId$.next(changes.id.currentValue);
    }
  }

  public onSubmit() {
    const device: IManagedDeviceModel = {
      name: this.deviceForm.value.name,
      localId: this.deviceForm.value.localId || '',
      // uid: this.userService.currentUserId(),
      entityId: this.deviceForm.value.entityId,
      deviceType: this.deviceForm.value.deviceType,
      traits: this.deviceForm.value.traits,
      id: this.id,
      uid: undefined
    };

    const action = updateManagedDevicesRequest({ device });
    this.store.dispatch(action);
  }

  public onCancel() {
    console.log('[ManagedEditComponent] onCancel');
    this.cancel.emit();
  }

  private updateFormValues(device: IManagedDeviceModel) {
    console.log('updateFormValues', device);

    this.deviceForm.patchValue({
      name: device.name,
      entityId: device.entityId,
      deviceType: device.deviceType,
      localId: device.localId,
      traits: device.traits
    });

    // this.deviceType = this.smartHomeService.getDeviceType(device.deviceType);
  }
}
