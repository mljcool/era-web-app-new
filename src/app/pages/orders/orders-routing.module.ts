import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersComponent } from './orders.component';
import { EcommerceOrdersService } from './orders.service';

const routes: Routes = [{
  path: '**', component: OrdersComponent, resolve: {
    data: EcommerceOrdersService
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
