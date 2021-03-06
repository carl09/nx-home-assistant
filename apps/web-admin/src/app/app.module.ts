import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/angular';
import { environment } from '../environments/environment';
import { effects, IRootState, reducers } from './+state/store';
import { AppComponent } from './app.component';
import { JsonViewerComponent } from './json-viewer/json-viewer.component';
import { ManagedEditFormComponent } from './managed-edit/managed-edit-form/managed-edit-form.component';
import { ManagedEditComponent } from './managed-edit/managed-edit.component';
import { ManagedViewComponent } from './managed-view/managed-view.component';
import { ManagedDialogComponent } from './managed/managed-dialog/managed-dialog.component';
import { ManagedComponent } from './managed/managed.component';

const appRoutes: Routes = [
  { path: '', component: ManagedComponent },
  { path: 'list', component: ManagedComponent },
  { path: 'edit/:id', component: ManagedEditComponent },
  { path: 'add', component: ManagedEditComponent },
  { path: 'view/:id', component: ManagedViewComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ManagedComponent,
    ManagedViewComponent,
    JsonViewerComponent,
    ManagedEditComponent,
    ManagedDialogComponent,
    ManagedEditFormComponent
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
    MatAutocompleteModule,
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
