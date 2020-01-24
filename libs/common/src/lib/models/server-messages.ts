import {
  IHomeAssistantEntityStatus,
  IHomeAssistantDeviceSummary
} from './home-assistant-entity';
import { IManagedDeviceModel } from './managed-device';

export const ManageDevicesType = 'firebase';
export const HomeAssistantDevicesType = 'device_list';
export const HomeAssistantDeviceUpdatedType = 'device_updated';
export const HomeAssistantDeviceInfoType = 'device_info';

export const ManageDevicesUpdateType = 'firebase_update';

export interface ManageDevices {
  type: 'firebase';
  devices: IManagedDeviceModel[];
}

export interface HomeAssistantDevices {
  type: 'device_list';
  devices: IHomeAssistantEntityStatus[];
}

export interface HomeAssistantDeviceUpdated {
  type: 'device_updated';
  device: IHomeAssistantEntityStatus;
}

export interface HomeAssistantDeviceInfo {
  type: 'device_info';
  devices: IHomeAssistantDeviceSummary[];
}

export interface ManageDevicesUpdate {
  type: 'firebase_update';
  update: IManagedDeviceModel;
}

export type ServerMessage =
  | ManageDevices
  | HomeAssistantDevices
  | HomeAssistantDeviceUpdated
  | HomeAssistantDeviceInfo
  | ManageDevicesUpdate;