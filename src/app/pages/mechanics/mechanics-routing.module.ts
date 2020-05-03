import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MechanicsComponent } from './mechanics.component';

const routes: Routes = [{ path: '', component: MechanicsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MechanicsRoutingModule { }
