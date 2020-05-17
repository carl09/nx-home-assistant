import { execute } from './device.execute';

describe('device execute', () => {
  let domain: string;
  let service: string;
  let data: { [key: string]: string };

  const mockService = (d: string, s: string, p: { [key: string]: string }) => {
    domain = d;
    service = s;
    data = p;
    return Promise.resolve({});
  };

  beforeEach(() => {
    domain = undefined;
    service = undefined;
    data = undefined;
  });

  describe('On Off', () => {
    it('turn switch on', async () => {
      const result = await execute(
        'action.devices.commands.OnOff',
        mockService,
        'switch.switch1',
        {
            on: true
        }
      );
      expect(result).toBeTruthy();

      expect(domain).toBe('switch')
      expect(service).toBe('turn_on')

    });

    it('turn switch off', async () => {
        const result = await execute(
          'action.devices.commands.OnOff',
          mockService,
          'switch.switch1',
          {
              on: false
          }
        );
        expect(result).toBeTruthy();
  
        expect(domain).toBe('switch')
        expect(service).toBe('turn_off')
  
      });

      it('turn input_boolean on', async () => {
        const result = await execute(
          'action.devices.commands.OnOff',
          mockService,
          'input_boolean.switch1',
          {
              on: true
          }
        );
        expect(result).toBeTruthy();
  
        expect(domain).toBe('input_boolean')
        expect(service).toBe('turn_on')
  
      });
  });
});
