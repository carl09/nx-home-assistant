import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { loadDevicesSuccess } from '../+state/devices/devices.actions';
import { IRootState } from '../+state/store';
import { environment } from '../../environments/environment';

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

  init() {
    this.webSocket = webSocket<IMassageBase>({
      url: environment.homeAssistaneUri,
      // openObserver: openObserver$,
      closeObserver: {
        next(closeEvent) {
          const customError = { code: 6666, reason: 'Custom evil reason' };
          console.log(
            `code: ${customError.code}, reason: ${customError.reason}`
          );
        }
      }
    });

    this.webSocket.subscribe(
      msg => {
        this.processMessage(msg);
      }, // Called whenever there is a message from the server.
      err => console.error('ws error', err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }

  private processMessage(msg: IMassageBase) {
    if (msg.type === 'auth_required') {
      console.log('Sending Auth Token');
      this.webSocket.next({
        type: 'auth',
        access_token: environment.homeAssistaneApiKey
      });
    } else if (msg.type === 'auth_ok') {
      this.webSocket.next({
        id: 1,
        type: 'get_states'
      });

      this.webSocket.next({
        id: 20,
        type: 'subscribe_events',
        event_type: 'state_changed'
      });
    } else if (msg.type === 'result') {
      if (msg.id === 1) {
        console.log('get_states msg', msg);

        const foo = loadDevicesSuccess({
          devices: (msg as any).result
        });
        this.store.dispatch(foo);
        // result
      }
    } else {
      console.log('Recived ', msg.type);
    }

    // if (msg.id === 19) {
    // }
  }
}
