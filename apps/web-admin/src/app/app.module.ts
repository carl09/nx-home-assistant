import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
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
import { ManagedDialogComponent } from './managed/managed-dialog/managed-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: ManagedComponent },
  { path: 'home', component: HomeAssistantComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeAssistantComponent,
    ManagedComponent,
    ManagedViewComponent,
    JsonViewerComponent,
    ManagedEditComponent,
    ManagedDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    MatDialogModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false, useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
    ); // Or whatever path you placed mdi.svg at
  }
}
