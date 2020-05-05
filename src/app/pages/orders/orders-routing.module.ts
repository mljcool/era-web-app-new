import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersComponent } from './orders.component';
import { EcommerceOrderComponent } from './order/order.component';
import { EcommerceOrdersService } from './orders.service';
import { EcommerceOrderService } from './order/order.service';

const routes: Routes = [
  {
    path: '', component: OrdersComponent, resolve: {
      data: EcommerceOrdersService
    },
  },
  {
    path: 'details/:id',
    component: EcommerceOrderComponent,
    resolve: {
      data: EcommerceOrderService
    },
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
