import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { HomeAssistantService } from '../../services/home-assistant.service';

@Injectable()
export class DevicesEffects {
  // loadDevices$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(UserActions.LoginSuccess),
  //       tap(action => {
  //         console.log(action);

  //         const url = `ws://${action.user.url}:${action.user.port}/api/websocket`;

  //         this.homeAssistantService.init(url, action.user.token);
  //       })
  //     ),
  //   { dispatch: false }
  // );

  constructor(
    private actions$: Actions,
    private homeAssistantService: HomeAssistantService
  ) {}
}
