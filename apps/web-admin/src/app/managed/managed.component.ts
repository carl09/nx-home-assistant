import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IManagedDeviceModel } from '@nx-home-assistant/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getAllManagedDevices } from '../+state/selectors';
import { IRootState } from '../+state/store';
import { MatDialog } from '@angular/material/dialog';
import { ManagedDialogComponent } from './managed-dialog/managed-dialog.component';

@Component({
  selector: 'nx-home-assistant-managed',
  templateUrl: './managed.component.html',
  styleUrls: ['./managed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagedComponent implements OnInit {
  devices$: Observable<IManagedDeviceModel[]>;

  viewId: string;
  editId: string;

  constructor(private store: Store<IRootState>, public dialog: MatDialog) {
    this.devices$ = this.store
      .select(x => getAllManagedDevices(x.managedDevices))
      .pipe(tap(x => console.log('devices$', x)));
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
    this.dialog.open(ManagedDialogComponent, {
      width: '250px'
    });
  }
}
