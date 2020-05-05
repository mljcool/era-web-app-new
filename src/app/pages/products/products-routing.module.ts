import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductsService } from './products.service';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDetailsService } from './product-details/product-details.service';

const routes: Routes = [
  {
    path: '', component: ProductsComponent, resolve: {
      data: ProductsService
    },

  },
  {
    path: 'details/:id/:handle',
    component: ProductDetailsComponent,
    resolve: {
      data: ProductDetailsService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
