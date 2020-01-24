import * as admin from 'firebase-admin';
import { DeviceStatus, IManagedDeviceModel } from '@nx-home-assistant/common';

export const setDeviceStatus = async (
  managedDeviceId: string,
  deviceStatus: DeviceStatus
): Promise<boolean> => {
  const db = admin.firestore();
  await db
    .collection('devices')
    .doc(managedDeviceId)
    .update({
      states: deviceStatus
    });

  return true;
};

export const upsertManagedDevice = (managedDevice: IManagedDeviceModel) => {
  const db = admin.firestore();

  managedDevice.uid = 'v7QW5h3ehIUV9Kze9sHY1yLudoI2';

  const { id, ...update } = managedDevice;

  if (managedDevice.id) {
    db.collection('devices')
      .doc(id)
      .set(update);
  } else {
    db.collection('devices').add(update);
  }
};
