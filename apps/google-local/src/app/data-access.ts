import {
  IHomeAssistantArea,
  IHomeAssistantDevice,
  IHomeAssistantEntity,
  IHomeAssistantEntityStatus,
  IManagedDeviceModel,
  namedLog
} from '@nx-home-assistant/common';
import {
  deleteManagedDevice,
  getDevicesCallBack,
  upsertManagedDevice
} from '@nx-home-assistant/data-access';
import { SmartHomeApp } from 'actions-on-google';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { HomeAssistantWebSocket, IMassageBase } from './home-assistant-server';

const log = namedLog('Data Access');

export const globalAgentUserId = 'fedf0bfd-5e8b-422c-8886-04bf293dde9f';

export class DataAccess {
  private homeAssistantWebSocket: HomeAssistantWebSocket;

  private fireBase: ReplaySubject<IManagedDeviceModel[]>;
  private entityStatus: Observable<IHomeAssistantEntityStatus[]>;
  private entityStatusUpdated: Observable<IHomeAssistantEntityStatus>;

  private areas: Observable<IHomeAssistantArea[]>;
  private entities: Observable<IHomeAssistantEntity[]>;
  private devices: Observable<IHomeAssistantDevice[]>;

  private counter = 1;

  constructor(private token: string, private googleHome?: SmartHomeApp) {
    this.homeAssistantWebSocket = new HomeAssistantWebSocket(
      `${environment.homeAssistaneSocketUri}/websocket`,
      token
    );
  }

  upsertManagedDevice(update: IManagedDeviceModel) {
    upsertManagedDevice(update);

    this.requestSync();
  }

  deleteManagedDevice(id: string) {
    deleteManagedDevice(id).then(() => {});
    this.requestSync();
  }

  getManagedDevices(): Observable<IManagedDeviceModel[]> {
    if (!this.fireBase) {
      this.initFireBase();
    }
    return this.fireBase.asObservable();
  }

  getEntityStatus(): Observable<IHomeAssistantEntityStatus[]> {
    if (!this.entityStatus) {
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
    this.homeAssistantWebSocket.next(iniMessage);

    return this.homeAssistantWebSocket
      .messages()
      .pipe(filter(x => x.id === resultId));
  }

  private requestSync() {
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
}
