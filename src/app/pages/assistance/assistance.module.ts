import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssistanceRoutingModule } from './assistance-routing.module';
import { AssistanceComponent } from './assistance.component';
import { AgmMapModule } from '@fuse/agMap.module';
import { FuseSharedModule } from '@fuse/shared.module';


@NgModule({
  declarations: [AssistanceComponent],
  imports: [
    CommonModule,
    AssistanceRoutingModule,
    AgmMapModule,
    FuseSharedModule
  ]
})
export class AssistanceModule { }
