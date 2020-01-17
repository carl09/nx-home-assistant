import { DevicesEntity } from './devices.models';
import * as DevicesActions from './devices.actions';
import { State, initialState, reducer } from './devices.reducer';

describe('Devices Reducer', () => {
  const createDevicesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as DevicesEntity);

  beforeEach(() => {});

  describe('valid Devices actions', () => {
    it('loadDevicesSuccess should return set the list of known Devices', () => {
      const devices = [
        createDevicesEntity('PRODUCT-AAA'),
        createDevicesEntity('PRODUCT-zzz')
      ];
      const action = DevicesActions.loadDevicesSuccess({ devices });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
