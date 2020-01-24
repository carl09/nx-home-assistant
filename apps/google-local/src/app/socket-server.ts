import {
  HomeAssistantDevicesType,
  HomeAssistantDeviceUpdatedType,
  ManageDevicesType,
  IHomeAssistantDevice,
  HomeAssistantDeviceInfoType,
  createQueryDevice,
  ServerMessage,
  ManageDevicesUpdateType
} from '@nx-home-assistant/common';
import * as http from 'http';
import * as WebSocket from 'ws';
import { DataAccess } from './data-access';
import { takeUntil, map, filter } from 'rxjs/operators';
import { Subject, combineLatest } from 'rxjs';
import { setDeviceStatus } from '@nx-home-assistant/data-access';
import { namedLog } from '../utils/logging';

const log = namedLog('Socket Service');

const isEq = (obj1: any = {}, obj2: any = {}): boolean => {
  const obj1Keys = Object.keys(obj1 || {});
  const obj2Keys = Object.keys(obj2 || {});

  const allKeys = new Set<string>();
  obj1Keys.forEach(x => allKeys.add(x));
  obj2Keys.forEach(x => allKeys.add(x));

  const diff = Array.from(allKeys).reduce((acc, key) => {
    if (obj1[key] !== obj2[key]) {
      acc[key] = {
        oldValue: obj1[key],
        newValue: obj2[key]
      };
    }

    return acc;
  }, {});

  if (Object.keys(diff).length === 0) {
    return true;
  }

  log.info('props changed', diff);
  return false;
};

export const createWebSocket = (
  server: http.Server,
  dataAccess: DataAccess
) => {
  const wss = new WebSocket.Server({ server, path: '/ws' });

  combineLatest([
    dataAccess.getManagedDevices(),
    dataAccess.getEntityStatusUpdated()
  ])
    .pipe(
      filter(([ids, update]) =>
        ids.map(x => x.entityId).includes(update.entity_id)
      )
    )
    .subscribe(([managedDevices, device]) => {
      const managedDevice = managedDevices.find(
        x => x.entityId === device.entity_id
      );

      const update = createQueryDevice(managedDevice, device);

      if (!isEq(managedDevice.states, update)) {
        setDeviceStatus(managedDevice.id, update);

        log.info(
          'Updating Entity ',
          device.entity_id,
          managedDevice.id,
          update
        );
      }
    });

  wss.on('connection', async (ws: WebSocket) => {
    const subject$ = new Subject();

    // connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {
      const serverMessage: ServerMessage = JSON.parse(message);

      switch (serverMessage.type) {
        case ManageDevicesUpdateType: {
          dataAccess.upsertManagedDevice(serverMessage.update);
          break;
        }
        default:
          // log the received message and send it back to the client
          log.warn('received: %s', message);
      }
    });

    dataAccess
      .getManagedDevices()
      .pipe(takeUntil(subject$))
      .subscribe(manageDevices => {
        ws.send(
          JSON.stringify({
            type: ManageDevicesType,
            devices: manageDevices || []
          })
        );
      });

    dataAccess
      .getEntityStatus()
      .pipe(takeUntil(subject$))
      .subscribe(homeAssistantDevices => {
        ws.send(
          JSON.stringify({
            type: HomeAssistantDevicesType,
            devices: homeAssistantDevices || []
          })
        );
      });

    dataAccess
      .getEntityStatusUpdated()
      .pipe(takeUntil(subject$))
      .subscribe(homeAssistantDevices => {
        ws.send(
          JSON.stringify({
            type: HomeAssistantDeviceUpdatedType,
            device: homeAssistantDevices
          })
        );
      });

    combineLatest([
      dataAccess.getAreas(),
      dataAccess.getEntities(),
      dataAccess.getDevices()
    ])
      .pipe(
        takeUntil(subject$),
        map(([areas, entities, devices]) => {
          const areasMap: { [key: string]: string } = (areas || []).reduce(
            (acc, a) => {
              acc[a.area_id] = a.name;
              return acc;
            },
            {}
          );

          const devicesMap: {
            [key: string]: IHomeAssistantDevice;
          } = (devices || []).reduce((acc, a) => {
            acc[a.id] = a;
            return acc;
          }, {});

          return (entities || [])
            .map(e => {
              const device = devicesMap[e.device_id];
              if (device) {
                return {
                  entity_id: e.entity_id,
                  area: areasMap[device.area_id],
                  manufacturer: device.manufacturer,
                  model: device.model,
                  name: device.name,
                  sw_version: device.sw_version
                };
              }
            })
            .filter(x => x);
        })
      )
      .subscribe(devicesInfo => {
        ws.send(
          JSON.stringify({
            type: HomeAssistantDeviceInfoType,
            devices: devicesInfo
          })
        );
      });

    ws.onclose = () => {
      subject$.next();
      subject$.complete();
    };

    ws.onerror = err => {
      log.error('createWebSocket onerror', err);
    };
  });
};
