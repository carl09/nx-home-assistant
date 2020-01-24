import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IHomeAssistantEntityStatus } from '@nx-home-assistant/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { loadDevicesSelected } from '../+state/devices/devices.actions';
import { getDeviceList, getSelectedId } from '../+state/selectors';
import { IRootState } from '../+state/store';

@Component({
  selector: 'nx-home-assistant-home-assistant',
  templateUrl: './home-assistant.component.html',
  styleUrls: ['./home-assistant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeAssistantComponent {
  title = 'web-admin';
  devices$: Observable<
    {
      entity_id: string;
      title: string;
    }[]
  >;
  selectEntityId$: Observable<string>;

  selectedId: string;

  constructor(private store: Store<IRootState>) {
    this.devices$ = this.store.pipe(
      select(x => getDeviceList(x.devices)),
      tap(x => console.log('devices$', x))
    );

    this.selectEntityId$ = this.store.pipe(select(x => getSelectedId(x)));
    // this.store.select('devices').pipe(map(x => getSelectedId(x)))
  }

  onClickDevice(event: IHomeAssistantEntityStatus) {
    console.log('onClickDevice', event);

    const action = loadDevicesSelected({
      entity_id: event.entity_id
    });

    this.selectedId = event.entity_id;

    this.store.dispatch(action);
  }
}
