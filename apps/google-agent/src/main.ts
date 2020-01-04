/// <reference types="@google/local-home-sdk" />
import { decodeFirst } from 'cbor';

interface IFakecandyData {
  id: string;
  model: string;
  hw_rev: string;
  fw_rev: string;
  leds: number;
  port: number;
  isLocalOnly?: boolean;
  isProxy?: boolean;
}

// HomeApp implements IDENTIFY and EXECUTE handler for smarthome local device execution.
export class HomeApp {
  constructor(private readonly app: smarthome.App) {
    this.app = app;
  }

  // identifyHandlers decode UDP scan data and structured device information.
  public identifyHandler = async (
    identifyRequest: smarthome.IntentFlow.IdentifyRequest
  ): Promise<smarthome.IntentFlow.IdentifyResponse> => {
    console.log('IDENTIFY request', identifyRequest);
    // TODO(proppy): handle multiple inputs.
    const device = identifyRequest.inputs[0].payload.device;
    if (device.udpScanData === undefined) {
      throw Error(
        `identify request is missing discovery response: ${identifyRequest}`
      );
    }
    // Raw discovery data are encoded as 'hex'.
    const udpScanData = Buffer.from(device.udpScanData.data, 'hex');
    console.log('udpScanData:', udpScanData);
    // Device encoded discovery payload in CBOR.
    const discoveryData: IFakecandyData = await decodeFirst(udpScanData);
    console.log('discoveryData:', discoveryData);
    const identifyResponse: smarthome.IntentFlow.IdentifyResponse = {
      intent: smarthome.Intents.IDENTIFY,
      requestId: identifyRequest.requestId,
      payload: {
        device: {
          id: device.id || 'deviceId',
          // type: 'action.devices.types.LIGHT',
          deviceInfo: {
            manufacturer: 'Colorful light maker',
            model: discoveryData.model,
            hwVersion: discoveryData.hw_rev,
            swVersion: discoveryData.fw_rev
          },
          verificationId: discoveryData.isLocalOnly
            ? undefined
            : discoveryData.id,
          isLocalOnly: discoveryData.isLocalOnly,
          isProxy: discoveryData.isProxy,
          commandedOverProxy: true
        }
      }
    };

    // @ts-ignore
    identifyResponse.payload.device.customData = {
      myCustom: 'stuff'
    };

    console.log('IDENTIFY response', identifyResponse);
    return identifyResponse;
  };

  public executeHandler = async (
    executeRequest: smarthome.IntentFlow.ExecuteRequest
  ): Promise<smarthome.IntentFlow.ExecuteResponse> => {
    console.log('EXECUTE request:', executeRequest);
    const command = executeRequest.inputs[0].payload.commands[0];
    const execution = command.execution[0];

    const executeResponse = new smarthome.Execute.Response.Builder().setRequestId(
      executeRequest.requestId
    );

    // Handle light device commands for all devices.
    await Promise.all(
      command.devices.map(async device => {
        const params = execution.params as {};
        const deviceCommand = new smarthome.DataFlow.HttpRequestData();

        const customData: {
          localEntityId?: string;
        } = device.customData as {};

        const localDeviceId =
          'localEntityId' in customData ? customData.localEntityId : device.id;

        // const proxyInfo = this.app.getDeviceManager().getProxyInfo(device.id);

        deviceCommand.method = smarthome.Constants.HttpOperation.POST;
        deviceCommand.requestId = executeRequest.requestId;
        deviceCommand.deviceId = device.id;
        // tslint:disable-next-line: deprecation
        deviceCommand.isSecure = false;
        deviceCommand.port = 8088;
        deviceCommand.path = `/api/execute/${localDeviceId}`;
        deviceCommand.data = JSON.stringify(command);
        deviceCommand.dataType = 'application/json';

        console.log('HttpRequestData:', deviceCommand);
        try {
          const result = await this.app.getDeviceManager().send(deviceCommand);
          const state = {
            ...params,
            online: true
          };
          executeResponse.setSuccessState(result.deviceId, state);
        } catch (e) {
          executeResponse.setErrorState(device.id, e.errorCode);
        }
      })
    );
    console.log('EXECUTE response', executeResponse);
    return executeResponse.build();
  };
}
