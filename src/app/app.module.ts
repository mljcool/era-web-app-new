import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';



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
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,

    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
    MatToolbarModule,
    // App modules
    LayoutModule,
    ServicesSharedModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),


  ],
  providers: [AuthServiceGuard],
  entryComponents: [
    ClientCheckerModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
