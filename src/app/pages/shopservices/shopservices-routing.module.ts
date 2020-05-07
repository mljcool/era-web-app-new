import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopservicesComponent } from './shopservices.component';
import { ShopOffersService } from './shopservices.service';
import { ShopServiceDetailsService } from './shopservice-details/shopservice-details.service';
import { ShopServiceDetailsComponent } from './shopservice-details/shopservice-details.component';

const routes: Routes = [
  {
    path: '', component: ShopservicesComponent, resolve: {
      data: ShopOffersService
    }
  },
  {
    path: 'create/:id',
    component: ShopServiceDetailsComponent,
    resolve: {
      data: ShopServiceDetailsService
    }
  },
  {
    path: 'details/:id/:handle',
    component: ShopServiceDetailsComponent,
    resolve: {
      data: ShopServiceDetailsService
    }
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopservicesRoutingModule { }
