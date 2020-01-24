import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  HomeAssistantDevicesType,
  HomeAssistantDeviceUpdatedType,
  ManageDevicesType,
  ServerMessage,
  ManageDevicesUpdate,
  IManagedDeviceModel,
  HomeAssistantDeviceInfoType
} from '@nx-home-assistant/common';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import {
  loadDevicesSuccess,
  updateDevices
} from '../+state/devices/devices.actions';
import { loadManagedDevicesSuccess } from '../+state/managed-devices/managed-devices.actions';
import { IRootState } from '../+state/store';
import { loadDeviceSummary } from '../+state/device-summary/device-summary.actions';

@Injectable({
  providedIn: 'root'
})
export class ManagedDevicesService {
  private webSocket: WebSocketSubject<ServerMessage>;

  constructor(private store: Store<IRootState>) {}

  init(url: string) {
    this.webSocket = webSocket<ServerMessage>({
      url,
      closeObserver: {
        next() {
          const customError = { code: 6666, reason: 'Custom evil reason' };
          console.log(
            `code: ${customError.code}, reason: ${customError.reason}`
          );
        }
      }
    });

    this.webSocket.subscribe(
      (msg: ServerMessage) => {
        switch (msg.type) {
          case ManageDevicesType: {
            const action = loadManagedDevicesSuccess({ devices: msg.devices });
            this.store.dispatch(action);
            break;
          }
          case HomeAssistantDevicesType: {
            const action = loadDevicesSuccess({
              devices: msg.devices
            });
            this.store.dispatch(action);
            break;
          }
          case HomeAssistantDeviceUpdatedType: {
            const action = updateDevices({ device: msg.device });
            this.store.dispatch(action);
            break;
          }
          case HomeAssistantDeviceInfoType: {
            const action = loadDeviceSummary({ devices: msg.devices });
            this.store.dispatch(action);
            break;
          }
        }
      },
      err => console.error('ws error', err),
      () => console.log('complete')
    );
  }

  updateManagedDevice(update: IManagedDeviceModel) {
    const massage: ManageDevicesUpdate = {
      type: 'firebase_update',
      update
    };

    this.webSocket.next(massage);
  }
}
