import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssistanceProceedComponent } from './assistance-proceed.component';

const routes: Routes = [{ path: '', component: AssistanceProceedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssistanceProceedRoutingModule { }
