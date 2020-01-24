import { IHomeAssistantDeviceSummary } from "@nx-home-assistant/common";

export interface DeviceSummaryState {
    ids: string[];
    entities: {[id: string]: IHomeAssistantDeviceSummary}
}
