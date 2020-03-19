import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { deviceTraits, deviceTypes, IManagedDeviceModel } from '@nx-home-assistant/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  selector: 'nx-home-assistant-managed-dialog',
  templateUrl: './managed-dialog.component.html',
  styleUrls: ['./managed-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagedDialogComponent implements OnInit, OnChanges {
  entitiesGrouped$: Observable<EntityGroup[]>;
  deviceTypes: Entity[];
  deviceTraits: string[];

  deviceForm: FormGroup;

  constructor(private store: Store<IRootState>, private dialogRef: MatDialogRef<ManagedDialogComponent>) {
    this.deviceForm = new FormGroup({
      name: new FormControl(''),
      entityId: new FormControl(''),
      deviceType: new FormControl(''),
      localId: new FormControl(''),
      traits: new FormControl()
    });

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

    this.deviceTypes = deviceTypes.map(x => {
      return {
        value: x.code,
        text: x.name
      };
    });

    this.deviceTraits = deviceTraits;
  }

  ngOnInit(): void {}

  ngOnChanges(_changes: SimpleChanges): void {}

  public onSubmit() {
    const device: IManagedDeviceModel = {
      name: this.deviceForm.value.name,
      localId: this.deviceForm.value.localId || '',
      // uid: this.userService.currentUserId(),
      entityId: this.deviceForm.value.entityId,
      deviceType: this.deviceForm.value.deviceType,
      traits: this.deviceForm.value.traits,
      id: undefined,
      uid: undefined
    };

    const action = updateManagedDevicesRequest({ device });
    this.store.dispatch(action);

    this.dialogRef.close();
  }

  public onCancel() {
    this.dialogRef.close();
  }
}
