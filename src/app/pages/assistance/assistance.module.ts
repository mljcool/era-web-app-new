import { MaterialModule } from '@fuse/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistanceRoutingModule } from './assistance-routing.module';
import { AssistanceComponent } from './assistance.component';
import { AgmMapModule } from '@fuse/agMap.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { AssistanceServices } from './assistance.service';
import { AssistanceDetailsModalComponent } from '@appCore/modals/AssistanceDetails/assistance-details.component';


@NgModule({
  declarations: [AssistanceComponent, AssistanceDetailsModalComponent],
  imports: [
    CommonModule,
    AssistanceRoutingModule,
    AgmMapModule,
    FuseSharedModule,
    MaterialModule

  ],
  providers: [
    AssistanceServices
  ],
  entryComponents: [
    AssistanceDetailsModalComponent
  ]
})
export class AssistanceModule { }
