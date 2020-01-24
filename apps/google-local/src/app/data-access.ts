import {
  IHomeAssistantEntityStatus,
  IManagedDeviceModel,
  IHomeAssistantArea,
  IHomeAssistantEntity,
  IHomeAssistantDevice
} from '@nx-home-assistant/common';
import {
  getDevicesCallBack,
  upsertManagedDevice
} from '@nx-home-assistant/data-access';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { filter, map, mergeMap, tap, shareReplay } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../environments/environment';
import { SmartHomeApp } from 'actions-on-google';
import { namedLog } from '../utils/logging';

const log = namedLog('Data Access');

export const globalAgentUserId = 'fedf0bfd-5e8b-422c-8886-04bf293dde9f';

// tslint:disable-next-line
(global as any).WebSocket = require('ws');

interface IMassageBase {
  type: string;
  id?: number;
  access_token?: string;
  success?: boolean;
  event?: {
    event_type?: string;
  };
  event_type?: string;
}

export class DataAccess {
  private webSocket: WebSocketSubject<IMassageBase>;

  private fireBase: ReplaySubject<IManagedDeviceModel[]>;
  private entityStatus: Observable<IHomeAssistantEntityStatus[]>;
  private entityStatusUpdated: Observable<IHomeAssistantEntityStatus>;

  private areas: Observable<IHomeAssistantArea[]>;
  private entities: Observable<IHomeAssistantEntity[]>;
  private devices: Observable<IHomeAssistantDevice[]>;

  private counter = 1;

  private homeAssistantActive: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  private homeAssistantResult: ReplaySubject<IMassageBase> = new ReplaySubject(
    1
  );

  constructor(private token: string, private googleHome?: SmartHomeApp) {}

  upsertManagedDevice(update: IManagedDeviceModel) {
    upsertManagedDevice(update);

    if (this.googleHome) {
      this.googleHome
        .requestSync(globalAgentUserId)
        .then(resp => {
          log.info('[DataAccess] Google Home requestSync', resp);
        })
        .catch(err => {
          log.error('[DataAccess] Google Home requestSync', err);
        });
    }
  }

  getManagedDevices(): Observable<IManagedDeviceModel[]> {
    if (!this.fireBase) {
      this.initFireBase();
    }
    return this.fireBase.asObservable();
  }

  getEntityStatus(): Observable<IHomeAssistantEntityStatus[]> {
    if (!this.entityStatus) {
      if (!this.webSocket) {
        this.initWebSocket();
      }

      this.entityStatus = this.createSubScription(
        {
          id: this.counter,
          type: 'get_states'
        },
        this.counter++
      ).pipe(
        map(msg => {
          return (msg as any).result as IHomeAssistantEntityStatus[];
        }),
        shareReplay(1)
      );
    }
    return this.entityStatus;
  }

  getEntityStatusUpdated(): Observable<IHomeAssistantEntityStatus> {
    if (!this.entityStatusUpdated) {
      if (!this.webSocket) {
        this.initWebSocket();
      }

      this.entityStatusUpdated = this.createSubScription(
        {
          id: this.counter,
          type: 'subscribe_events',
          event_type: 'state_changed'
        },
        this.counter++
      ).pipe(
        filter(x => x.event?.event_type === 'state_changed'),
        map(msg => {
          return (msg as any).event.data
            .new_state as IHomeAssistantEntityStatus;
        }),
        shareReplay(1)
      );
    }
    return this.entityStatusUpdated;
  }

  getAreas() {
    if (!this.areas) {
      this.areas = this.createSubScription(
        {
          id: this.counter,
          type: 'config/area_registry/list'
        },
        this.counter++
      ).pipe(
        map(msg => {
          return (msg as any).result as IHomeAssistantArea[];
        }),
        shareReplay(1)
      );
    }

    return this.areas;
  }

  getEntities() {
    if (!this.entities) {
      this.entities = this.createSubScription(
        {
          id: this.counter,
          type: 'config/entity_registry/list'
        },
        this.counter++
      ).pipe(
        map(msg => {
          return (msg as any).result as IHomeAssistantEntity[];
        }),
        shareReplay(1)
      );
    }

    return this.entities;
  }

  getDevices() {
    if (!this.devices) {
      this.devices = this.createSubScription(
        {
          id: this.counter,
          type: 'config/device_registry/list'
        },
        this.counter++
      ).pipe(
        map(msg => {
          return (msg as any).result as IHomeAssistantDevice[];
        }),
        shareReplay(1)
      );
    }

    return this.devices;
  }

  private initFireBase() {
    this.fireBase = new ReplaySubject(1);

    getDevicesCallBack(d => {
      this.fireBase.next(d);
    });
  }

  private createSubScription(iniMessage: IMassageBase, resultId: number) {
    return this.homeAssistantActive.pipe(
      filter(x => x),
      tap(() => {
        this.webSocket.next(iniMessage);
      }),
      mergeMap(() => {
        return this.homeAssistantResult.pipe(filter(x => x.id === resultId));
      })
    );
  }

  private initWebSocket() {
    this.webSocket = webSocket<IMassageBase>({
      url: `${environment.homeAssistaneSocketUri}/websocket`,
      closeObserver: {
        next(err) {
          log.error('Home Assistant Web Socket Closed', err);
        }
      }
    });

    this.webSocket.subscribe(
      msg => {
        this.processMessage(msg, this.token);
      },
      err => log.error('ws error', err),
      () => log.warn('webSocket completed')
    );
  }

  private processMessage(msg: IMassageBase, token: string) {
    if (msg.type === 'auth_required') {
      this.webSocket.next({
        type: 'auth',
        access_token: token
      });
    } else if (msg.type === 'auth_ok') {
      this.homeAssistantActive.next(true);
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
