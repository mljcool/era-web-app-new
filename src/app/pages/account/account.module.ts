import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { ServicesSharedModule } from '@appCore/shared/sharedServices.module';
import { MaterialModule } from '@fuse/material.module';
import { AgmMapModule } from '@fuse/agMap.module';


@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FuseSharedModule,
    ServicesSharedModule,
    MaterialModule,
    AgmMapModule
  ]
})
export class AccountModule { }
