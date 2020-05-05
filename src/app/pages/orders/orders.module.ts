import { MaterialModule } from './../../../@fuse/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { EcommerceOrdersService } from './orders.service';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { OrdersComponent } from './orders.component';
import { AgmMapModule } from '@fuse/agMap.module';
import { OrderDetailsService } from './order-details/order-details.service';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  declarations: [OrdersComponent, OrderDetailsComponent],
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
    OrderDetailsService
  ]
})
export class OrdersModule { }
