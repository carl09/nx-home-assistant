import { NgModule } from '@angular/core';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo
} from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { HomeAssistantComponent } from './home-assistant/home-assistant.component';
import { LoginComponent } from './login/login.component';
import { ManagedComponent } from './managed/managed.component';
import { ProfileComponent } from './profile/profile.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToDevices = () => redirectLoggedInTo(['profile']);

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'ha', pathMatch: 'full' },
  {
    path: 'home-entities',
    component: HomeAssistantComponent,
    data: { label: 'Home Entities' }
  },
  {
    path: 'managed',
    component: ManagedComponent,
    data: { label: 'Managed', authGuardPipe: redirectUnauthorizedToLogin },
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { label: 'Login', authGuardPipe: redirectLoggedInToDevices },
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { label: 'Profile', authGuardPipe: redirectUnauthorizedToLogin },
    canActivate: [AngularFireAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(rootRouterConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
