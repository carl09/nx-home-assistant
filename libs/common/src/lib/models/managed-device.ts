import { IHomeAssistantDeviceSummary } from './home-assistant-entity';

export interface IManagedFirebaseModel {
  name: string;
  localId: string;
  entityId: string;
  uid?: string;
  deviceType: string;
  traits: string[];
  states?: any;
  device?: IHomeAssistantDeviceSummary
}

export interface IManagedDeviceModel extends IManagedFirebaseModel {
  id: string;
}
