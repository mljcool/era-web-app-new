import { MaterialModule } from '@fuse/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { LayoutModule } from 'app/layout/layout.module';
import { ServicesSharedModule } from '@appCore/shared/sharedServices.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'environments/environment';
import { FirebaseUIModule } from 'firebaseui-angular';
import { firebaseUiAuthConfig } from '@appCore/firebase/auth-config';
import { AuthServiceGuard } from '@appCore/auth/auth-service.guard';
import { ClientCheckerModalComponent } from '@appCore/modals/checker/checker.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeDbService } from '@appCore/models/fake-db.service';




@NgModule({
  declarations: [
    AppComponent,
    ClientCheckerModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,


    // Material moment date module
    MatMomentDateModule,

    // Material
    MaterialModule,
    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,

    // App modules
    LayoutModule,
    ServicesSharedModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    InMemoryWebApiModule.forRoot(FakeDbService, {
      delay: 0,
      passThruUnknownUrl: true
    }),
    GooglePlaceModule

  ],
  providers: [AuthServiceGuard],
  entryComponents: [
    ClientCheckerModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
