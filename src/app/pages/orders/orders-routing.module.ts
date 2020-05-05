import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersComponent } from './orders.component';
import { EcommerceOrdersService } from './orders.service';
import { OrderDetailsService } from './order-details/order-details.service';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  {
    path: '', component: OrdersComponent, resolve: {
      data: EcommerceOrdersService
    },
  },
  {
    path: 'details/:id',
    component: OrderDetailsComponent,
    resolve: {
      data: OrderDetailsService
    },
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
