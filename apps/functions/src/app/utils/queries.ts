import * as admin from 'firebase-admin';
import { IDeviceModel, IHomeAssistantEntity } from '../common/device.model';
import { IUserModel } from '../common/user.model';
import { DeviceStatus } from '../device.model';
import { get, post } from './constant';

export const getCurrentUser = async (): Promise<IUserModel> => {
  const db = admin.firestore();
  const userId = 'v7QW5h3ehIUV9Kze9sHY1yLudoI2';
  const doc = await db.doc(`user/${userId}`).get();
  return doc.data() as IUserModel;
};

export const getDevice = async (deviceId: string): Promise<IDeviceModel> => {
  const db = admin.firestore();
  const doc = await db.doc(`devices/${deviceId}`).get();
  return doc.data() as IDeviceModel;
};

export const findDeviceStatusByEntityId = async (
  entityId: string
): Promise<{ id: string; model: IDeviceModel }> => {
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

  const data = doc.data() as IDeviceModel;

  return {
    id: doc.id,
    model: data
  };
};

export const getEntity = (
  user: IUserModel,
  entityId: string
): Promise<IHomeAssistantEntity> => {
  return get<IHomeAssistantEntity>(
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

export const setDeviceStatus = async (
  deviceId: string,
  deviceStatus: DeviceStatus
): Promise<boolean> => {
  const db = admin.firestore();
  await db
    .collection('devices')
    .doc(deviceId)
    .update({
      states: deviceStatus
    });

  return true;
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
  return post<IHomeAssistantEntity>(
    `https://${user.url}:${user.port}/api/services/${domain}/${service}`,
    user.token,
    data
  );
};
