import {
  asyncForEach,
  createSyncDevice,
  IManagedDeviceModel
} from '@nx-home-assistant/common';
import { SmartHomeV1SyncDevices } from 'actions-on-google';
import { IUserModel } from './common/user.model';
import { getDevices, getEntity } from './utils/queries';

export const syncDevices = async (
  user: IUserModel
): Promise<SmartHomeV1SyncDevices[]> => {
  console.log('[syncDevices] Started');

  const results: SmartHomeV1SyncDevices[] = [];

  const deviceModels: IManagedDeviceModel[] = await getDevices();

  await asyncForEach(deviceModels, async (deviceModel: IManagedDeviceModel) => {
    console.log('[syncDevices] Started for', deviceModel.entityId);
    const entity = await getEntity(user, deviceModel.entityId);
    results.push(createSyncDevice(deviceModel.id, deviceModel, entity));
  });

  console.log('[syncDevices] compleate'); // , results);

  return results;
};
