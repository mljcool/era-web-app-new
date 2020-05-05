
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { FuseWidgetModule } from '@fuse/components';
import { MaterialModule } from '@fuse/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { ProductsService } from './products.service';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDetailsService } from './product-details/product-details.service';


@NgModule({
  declarations: [ProductsComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    FuseSharedModule,
    FuseWidgetModule,

  ],
  providers: [
    ProductsService,
    ProductDetailsService
  ]
})
export class ProductsModule { }
