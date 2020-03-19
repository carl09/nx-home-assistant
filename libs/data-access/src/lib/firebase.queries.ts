import { IManagedDeviceModel } from '@nx-home-assistant/common';
import * as admin from 'firebase-admin';

export const getDevicesAsync = async (): Promise<IManagedDeviceModel[]> => {
  const db = admin.firestore();
  const devicesCollection = await db
    .collection('devices')
    .where('uid', '==', 'v7QW5h3ehIUV9Kze9sHY1yLudoI2')
    .get();

  const deviceModels: IManagedDeviceModel[] = [];

  devicesCollection.forEach(device => {
    const deviceModel = device.data() as IManagedDeviceModel;
    deviceModel.id = device.id;
    deviceModels.push(deviceModel);
  });

  return deviceModels;
};

export const getDevicesCallBack = async (
  callback: (devices: IManagedDeviceModel[]) => any
) => {
  const db = admin.firestore();

  db.collection('devices')
    .where('uid', '==', 'v7QW5h3ehIUV9Kze9sHY1yLudoI2')
    .onSnapshot(
      devicesCollection => {
        const deviceModels: IManagedDeviceModel[] = [];

        devicesCollection.forEach(device => {
          const deviceModel = device.data() as IManagedDeviceModel;
          deviceModel.id = device.id;
          deviceModels.push(deviceModel);
        });

        callback(deviceModels);
      },
      err => {
        console.error(err);
      }
    );
};
