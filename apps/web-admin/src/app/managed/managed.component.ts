import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IManagedDeviceModel, namedLog } from '@nx-home-assistant/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { getAllManagedDevicesSorted } from '../+state/selectors';
import { IRootState } from '../+state/store';
import { ManagedDialogComponent } from './managed-dialog/managed-dialog.component';

const log = namedLog('ManagedComponent');

interface IViewManageDevice extends IManagedDeviceModel {
  icon: string;
}

@Component({
  selector: 'nx-home-assistant-managed',
  templateUrl: './managed.component.html',
  styleUrls: ['./managed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagedComponent implements OnInit {
  devices$: Observable<IViewManageDevice[]>;

  viewId: string;
  editId: string;

  constructor(private store: Store<IRootState>, public dialog: MatDialog) {
    this.devices$ = this.store
      .select(x => getAllManagedDevicesSorted(x.managedDevices))
      .pipe(
        map(x => {
          return x.map(d => {
            let icon = 'power-socket-au';
            switch (d.deviceType) {
              case 'action.devices.types.SWITCH':
                icon = 'power-socket-au';
                break;
              case 'action.devices.types.THERMOSTAT':
                icon = 'air-conditioner';
                break;
              case 'action.devices.types.FAN':
                icon = 'fan';
                break;
              case 'action.devices.types.CAMERA':
                icon = 'cctv';
                break;
              case 'action.devices.types.MICROWAVE':
                icon = 'toaster-oven';
                break;
              case 'action.devices.types.COFFEE_MAKER':
                icon = 'coffee-maker';
                break;
              default:
                log.warn(d.deviceType);
            }

            return { ...d, icon };
          });
        }),
        tap(x => console.log('devices$', x))
      );
  }

  ngOnInit() {}

  onEdit(device: IManagedDeviceModel) {
    this.editId = device.id;
    this.viewId = undefined;
  }

  onView(device: IManagedDeviceModel) {
    this.viewId = device.id;
    this.editId = undefined;
  }

  onCancel() {
    console.log('[ManagedComponent] onCancel');
    this.editId = undefined;
    this.viewId = undefined;
  }

  addNew() {
    // this.dialog.open(ManagedDialogComponent, {
    //   width: '250px'
    // });
  }
}
