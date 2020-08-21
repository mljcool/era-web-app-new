import { MaterialModule } from '@fuse/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistanceProceedRoutingModule } from './assistance-proceed-routing.module';
import { AssistanceProceedComponent } from './assistance-proceed.component';
import { AgmMapModule } from '@fuse/agMap.module';
import { FuseSharedModule } from '@fuse/shared.module';


@NgModule({
  declarations: [AssistanceProceedComponent],
  imports: [
    CommonModule,
    AssistanceProceedRoutingModule,
    AgmMapModule,
    FuseSharedModule,
    MaterialModule

  ],
})
export class AssistanceProceedModule { }
