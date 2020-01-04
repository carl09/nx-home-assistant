import { SmartHomeV1SyncDevices } from 'actions-on-google';
import * as admin from 'firebase-admin';
import { createSyncDevice } from './common/device.fn';
import { IDeviceModelEdit } from './common/device.model';
import { IUserModel } from './common/user.model';
import { asyncForEach } from './utils/constant';
import { getEntity } from './utils/queries';

export const syncDevices = async (
  user: IUserModel
): Promise<SmartHomeV1SyncDevices[]> => {
  console.log('[syncDevices]');

  const db = admin.firestore();

  const devicesCollection = await db
    .collection('devices')
    .where('uid', '==', 'v7QW5h3ehIUV9Kze9sHY1yLudoI2')
    .get();

  const results: SmartHomeV1SyncDevices[] = [];

  const deviceModels: IDeviceModelEdit[] = [];

  devicesCollection.forEach(device => {
    const deviceModel = device.data() as IDeviceModelEdit;
    deviceModel.id = device.id;
    deviceModels.push(deviceModel);
  });

  await asyncForEach(deviceModels, async (deviceModel: IDeviceModelEdit) => {
    const entity = await getEntity(user, deviceModel.entityId);
    results.push(createSyncDevice(deviceModel.id, deviceModel, entity));
  });

  console.log('[syncDevices] results', results);

  return results;
};
