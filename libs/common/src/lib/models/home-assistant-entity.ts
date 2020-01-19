export interface IHomeAssistantEntityAttributes {
  friendly_name: string;
  hidden: boolean;
  icon: string;
  [key: string]: any;
}

export interface IHomeAssistantEntity {
  state: string;
  entity_id: string;
  last_changed: Date;
  last_updated: Date;
  attributes: IHomeAssistantEntityAttributes;
}
