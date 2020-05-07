import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopServiceDetailsService } from './shopservice-details/shopservice-details.service';
import { ShopServiceDetailsComponent } from './shopservice-details/shopservice-details.component';
import { ShopservicesRoutingModule } from './shopservices-routing.module';
import { ShopservicesComponent } from './shopservices.component';
import { ShopOffersService } from './shopservices.service';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '@fuse/material.module';
import { FuseWidgetModule } from '@fuse/components';


@NgModule({
  declarations: [ShopservicesComponent, ShopServiceDetailsComponent],
  imports: [
    CommonModule,
    ShopservicesRoutingModule,

    MaterialModule,
    FuseSharedModule,
    FuseWidgetModule,
  ],
  providers: [
    ShopOffersService,
    ShopServiceDetailsService
  ]
})
export class ShopservicesModule { }
