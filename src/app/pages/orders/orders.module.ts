import { MaterialModule } from './../../../@fuse/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { EcommerceOrdersService } from './orders.service';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MaterialModule,
    FuseSharedModule,
    FuseWidgetModule
  ],
  providers: [
    EcommerceOrdersService
  ]
})
export class OrdersModule { }
