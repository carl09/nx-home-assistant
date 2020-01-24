import {
  CallService,
  DeviceStatus,
  get,
  IHomeAssistantEntityStatus,
  IManagedDeviceModel,
  post
} from '@nx-home-assistant/common';
import * as admin from 'firebase-admin';
import { IUserModel } from '../common/user.model';

export const getCurrentUser = async (): Promise<IUserModel> => {
  const db = admin.firestore();
  const userId = 'v7QW5h3ehIUV9Kze9sHY1yLudoI2';
  const doc = await db.doc(`user/${userId}`).get();
  return doc.data() as IUserModel;
};

export const getDevices = async (): Promise<IManagedDeviceModel[]> => {
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

export const getDevice = async (
  deviceId: string
): Promise<IManagedDeviceModel> => {
  const db = admin.firestore();
  const doc = await db.doc(`devices/${deviceId}`).get();
  return doc.data() as IManagedDeviceModel;
};

export const findDeviceStatusByEntityId = async (
  entityId: string
): Promise<IManagedDeviceModel> => {
  const db = admin.firestore();
  const docs = await db
    .collection('devices')
    .where('entityId', '==', entityId)
    .limit(1)
    .get();

  const doc = docs.docs[0];

  if (!doc || !doc.exists) {
    throw new Error('deviceNotFound');
  }

  const data = doc.data() as IManagedDeviceModel;

  data.id = doc.id;
  return data;
};

export const getEntity = (
  user: IUserModel,
  entityId: string
): Promise<IHomeAssistantEntityStatus> => {
  return get<IHomeAssistantEntityStatus>(
    `https://${user.url}:${user.port}/api/states/${entityId}`,
    user.token
  );
};

export const getDeviceStatus = async (
  deviceId: string
): Promise<DeviceStatus> => {
  const db = admin.firestore();
  const doc = await db
    .collection('devices')
    .doc(deviceId)
    .get();

  if (!doc.exists) {
    throw new Error('deviceNotFound');
  }

  const data = doc.data() as { states: DeviceStatus };

  return data.states;
};


export const setDeviceStatusProp = async (
  deviceId: string,
  propName: string,
  value: any
): Promise<boolean> => {
  const key = `states.${propName}`;
  const db = admin.firestore();

  await db
    .collection('devices')
    .doc(deviceId)
    .update({
      [key]: value
    });

  return true;
};

export const callService = (
  user: IUserModel,
  domain: string,
  service: string,
  data: { [key: string]: string }
) => {
  return post<IHomeAssistantEntityStatus>(
    `https://${user.url}:${user.port}/api/services/${domain}/${service}`,
    user.token,
    data
  );
};

export const callRemoteService = (user: IUserModel): CallService => {
  return (domain: string, service: string, data: { [key: string]: string }) => {
    return post<{}>(
      `http://hassio/homeassistant/api/services/${domain}/${service}`,
      user.token,
      data
    );
  };
};
