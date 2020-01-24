import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/angular';
import { environment } from '../environments/environment';
import { IRootState, reducers, effects } from './+state/store';
import { AppComponent } from './app.component';
import { HomeAssistantComponent } from './home-assistant/home-assistant.component';
import { JsonViewerComponent } from './json-viewer/json-viewer.component';
import { ManagedEditComponent } from './managed/managed-edit/managed-edit.component';
import { ManagedViewComponent } from './managed/managed-view/managed-view.component';
import { ManagedComponent } from './managed/managed.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeAssistantComponent,
    ManagedComponent,
    ManagedViewComponent,
    JsonViewerComponent,
    ManagedEditComponent
  ],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    StoreModule.forRoot<IRootState>(reducers, {
      metaReducers: !environment.production ? [] : [],
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true
      }
    }),
    HttpClientModule,
    EffectsModule.forRoot(effects),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
