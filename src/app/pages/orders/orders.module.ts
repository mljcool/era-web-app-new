import { MaterialModule } from './../../../@fuse/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { EcommerceOrdersService } from './orders.service';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { OrdersComponent } from './orders.component';
import { EcommerceOrderComponent } from './order/order.component';
import { EcommerceOrderService } from './order/order.service';
import { AgmMapModule } from '@fuse/agMap.module';

@NgModule({
  declarations: [OrdersComponent, EcommerceOrderComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MaterialModule,
    FuseSharedModule,
    FuseWidgetModule,
    AgmMapModule
  ],
  providers: [
    EcommerceOrdersService,
    EcommerceOrderService
  ]
})
export class OrdersModule { }
