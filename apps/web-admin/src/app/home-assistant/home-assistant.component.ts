import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IHomeAssistantEntity } from '@nx-home-assistant/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { loadDevicesSelected } from '../+state/devices/devices.actions';
import { devicesAdapter } from '../+state/devices/devices.reducer';
import { getSelectedId } from '../+state/selectors';
import { IRootState } from '../+state/store';

@Component({
  selector: 'nx-home-assistant-home-assistant',
  templateUrl: './home-assistant.component.html',
  styleUrls: ['./home-assistant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeAssistantComponent {
  title = 'web-admin';
  devices$: Observable<IHomeAssistantEntity[]>;
  selectEntityId$: Observable<string>;

  selectedId: string;

  constructor(private store: Store<IRootState>) {
    this.devices$ = this.store
      .select('devices')
      .pipe(map(devicesAdapter.getSelectors().selectAll));

    this.selectEntityId$ = this.store.pipe(select(x => getSelectedId(x)));
    // this.store.select('devices').pipe(map(x => getSelectedId(x)))
  }

  onClickDevice(event: IHomeAssistantEntity) {
    console.log('onClickDevice', event);

    const action = loadDevicesSelected({
      entity_id: event.entity_id
    });

    this.selectedId = event.entity_id;

    this.store.dispatch(action);
  }
}
