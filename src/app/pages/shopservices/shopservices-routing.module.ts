import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopservicesComponent } from './shopservices.component';

const routes: Routes = [{ path: '', component: ShopservicesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopservicesRoutingModule { }
