import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAssistantComponent } from './home-assistant/home-assistant.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'ha', pathMatch: 'full' },
  { path: 'ha', component: HomeAssistantComponent }
  // // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // {
  //   path: 'profile',
  //   component: UserComponent,
  //   canActivate: [AngularFireAuthGuard],
  //   data: { authGuardPipe: redirectUnauthorizedToLogin }
  // },
  // {
  //   path: 'devices',
  //   component: DevicesComponent,
  //   canActivate: [AngularFireAuthGuard],
  //   data: { authGuardPipe: redirectUnauthorizedToLogin }
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(rootRouterConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
