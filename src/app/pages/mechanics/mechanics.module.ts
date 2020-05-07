import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MechanicsRoutingModule } from './mechanics-routing.module';
import { MechanicsComponent } from './mechanics.component';
import { MaterialModule } from '@fuse/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { MechanicService } from './mechanics.service';
import { MechanicSelectedBarComponent } from './selected-bar/selected-bar.component';
import { MechanicListComponent } from './mechanic-list/mechanic-list.component';
import { MechanicMainSidebarComponent } from './sidebars/main/main.component';
import { MechanicsFormDialogComponent } from './mechanic-form/mechanic-form.component';

@NgModule({
  declarations: [
    MechanicsComponent,
    MechanicSelectedBarComponent,
    MechanicListComponent,
    MechanicMainSidebarComponent,
    MechanicsFormDialogComponent],
  imports: [
    CommonModule,
    MechanicsRoutingModule,
    MaterialModule,
    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule,
  ],
  providers: [MechanicService],
  entryComponents: [
    MechanicsFormDialogComponent
  ]
})
export class MechanicsModule { }
