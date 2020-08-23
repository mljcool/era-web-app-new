import { MaterialModule } from '@fuse/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistanceProceedRoutingModule } from './assistance-proceed-routing.module';
import { AssistanceProceedComponent } from './assistance-proceed.component';
import { AgmMapModule } from '@fuse/agMap.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { AccommodateAssistanceModalComponent } from '@appCore/modals/AccommoDateAssistance/accommodate-assistance.component';

@NgModule({
  declarations: [AssistanceProceedComponent, AccommodateAssistanceModalComponent],
  imports: [CommonModule, AssistanceProceedRoutingModule, AgmMapModule, FuseSharedModule, MaterialModule],
  entryComponents: [AccommodateAssistanceModalComponent],
})
export class AssistanceProceedModule {}
