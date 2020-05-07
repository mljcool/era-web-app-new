import { MechanicService } from './mechanics.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MechanicsComponent } from './mechanics.component';

const routes: Routes = [{
  path: '', component: MechanicsComponent, resolve: {
    contact: MechanicService
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MechanicsRoutingModule { }
