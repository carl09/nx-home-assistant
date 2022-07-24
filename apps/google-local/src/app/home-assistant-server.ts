import { namedLog } from '@nx-home-assistant/common';
import { ReplaySubject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../environments/environment';

const log = namedLog('Home assistant Socket Client');

// tslint:disable-next-line
(global as any).WebSocket = require('ws');

export interface IMassageBase {
  type: string;
  id?: number;
  access_token?: string;
  success?: boolean;
  event?: {
    event_type?: string;
  };
  event_type?: string;
}

export class HomeAssistantWebSocket {
  private webSocketSubject: WebSocketSubject<IMassageBase>;

  private homeAssistantResult: ReplaySubject<IMassageBase> = new ReplaySubject(
    1
  );

  private subscribedMessages: IMassageBase[] = [];

  constructor(private url: string, private token: string) {}

  initWebSocket() {
    this.webSocketSubject = webSocket<IMassageBase>({
      url: this.url,
      closeObserver: {
        next: (err) =>  {
          log.error('Home Assistant Web Socket Closed', err);
            setTimeout(() => {
              log.debug('Re connecting');
              this.initWebSocket();
            }, 5000);
        }
      }
    });

    this.webSocketSubject
      .subscribe(
        msg => {
          this.processMessage(msg);
        },
        err => {
          // log.error('ws error', err.message);

          log.error('ws error', Object.keys(err));
          this.webSocketSubject.complete();
        },
        () => {
          log.warn('webSocket completed');
        }
      );
  }

  messages() {
    return this.homeAssistantResult.asObservable();
  }

  next(massageBase: IMassageBase) {
    this.subscribedMessages.push(massageBase);

    if (!this.webSocketSubject) {
      this.initWebSocket();
    } else {
      log.debug('Adding Messages - WS Open', massageBase);
      this.webSocketSubject.next(massageBase);
    }
  }

  private processMessage(msg: IMassageBase) {
    if (msg.type === 'auth_required') {
      this.webSocketSubject.next({
        type: 'auth',
        access_token: this.token
      });
    } else if (msg.type === 'auth_ok') {
      this.subscribedMessages.forEach(m => {
        log.debug('Adding Messages', m);
        this.webSocketSubject.next(m);
      });
    } else if (msg.type === 'result') {
      this.homeAssistantResult.next(msg);
    } else if (msg.type === 'event') {
      this.homeAssistantResult.next(msg);
    } else if (msg.type === 'auth_invalid') {
      log.error('Auth Error', (msg as any).message);
      log.info('Token', {
        token: this.token,
        url: `${environment.homeAssistaneSocketUri}/websocket`
      });
    } else {
      log.warn('processMessage unknown', msg);
    }
  }
}
