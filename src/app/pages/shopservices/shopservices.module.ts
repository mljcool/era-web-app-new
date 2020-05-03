import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopservicesRoutingModule } from './shopservices-routing.module';
import { ShopservicesComponent } from './shopservices.component';


@NgModule({
  declarations: [ShopservicesComponent],
  imports: [
    CommonModule,
    ShopservicesRoutingModule
  ]
})
export class ShopservicesModule { }
