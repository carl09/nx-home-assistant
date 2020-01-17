import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { DevicesEffects } from './devices.effects';
import * as DevicesActions from './devices.actions';

describe('DevicesEffects', () => {
  let actions: Observable<any>;
  let effects: DevicesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        DevicesEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(DevicesEffects);
  });

  describe('loadDevices$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DevicesActions.loadDevices() });

      const expected = hot('-a-|', {
        a: DevicesActions.loadDevicesSuccess({ devices: [] })
      });

      expect(effects.loadDevices$).toBeObservable(expected);
    });
  });
});
