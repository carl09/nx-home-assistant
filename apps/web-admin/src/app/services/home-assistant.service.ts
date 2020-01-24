import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import {
  loadDevicesSuccess,
  updateDevices
} from '../+state/devices/devices.actions';
import { IRootState } from '../+state/store';

interface IMassageBase {
  type: string;
  id?: number;
  access_token?: string;
  event_type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HomeAssistantService {
  private webSocket: WebSocketSubject<IMassageBase>;

  constructor(private store: Store<IRootState>) {}

  init(url: string, token: string) {
    this.webSocket = webSocket<IMassageBase>({
      url,
      // openObserver: openObserver$,
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
      msg => {
        this.processMessage(msg, token);
      }, // Called whenever there is a message from the server.
      err => console.error('ws error', err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }

  private processMessage(msg: IMassageBase, token: string) {
    if (msg.type === 'auth_required') {
      console.log('Sending Auth Token');
      this.webSocket.next({
        type: 'auth',
        access_token: token
      });
    } else if (msg.type === 'auth_ok') {
      this.webSocket.next({
        id: 1,
        type: 'get_states'
      });

      this.webSocket.next({
        id: 2,
        type: 'subscribe_events',
        event_type: 'state_changed'
      });
    } else if (msg.type === 'result') {
      if (msg.id === 1) {
        console.log('get_states msg', msg);

        const action = loadDevicesSuccess({
          devices: (msg as any).result
        });
        this.store.dispatch(action);
      } else {
        console.log('result', msg.id);
      }
    } else if (msg.type === 'event') {
      if (msg.id === 2) {
        const event = (msg as any).event;
        if (event.event_type === 'state_changed') {
          // console.log('2', event.data.new_state.entity_id);

          const action = updateDevices({ device: event.data.new_state });
          this.store.dispatch(action);
        }
      }
    } else {
      console.log('Recived ', msg.type);
    }

    // if (msg.id === 19) {
    // }
  }
}

// type: "config/area_registry/list"
// type: "config/entity_registry/list"
// type: "config/device_registry/list"
