import { DevicesEntity } from './devices.models';
import { State, devicesAdapter, initialState } from './devices.reducer';
import * as DevicesSelectors from './devices.selectors';

describe('Devices Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDevicesId = it => it['id'];
  const createDevicesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as DevicesEntity);

  let state;

  beforeEach(() => {
    state = {
      devices: devicesAdapter.addAll(
        [
          createDevicesEntity('PRODUCT-AAA'),
          createDevicesEntity('PRODUCT-BBB'),
          createDevicesEntity('PRODUCT-CCC')
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('Devices Selectors', () => {
    it('getAllDevices() should return the list of Devices', () => {
      const results = DevicesSelectors.getAllDevices(state);
      const selId = getDevicesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = DevicesSelectors.getSelected(state);
      const selId = getDevicesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getDevicesLoaded() should return the current 'loaded' status", () => {
      const result = DevicesSelectors.getDevicesLoaded(state);

      expect(result).toBe(true);
    });

    it("getDevicesError() should return the current 'error' state", () => {
      const result = DevicesSelectors.getDevicesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
