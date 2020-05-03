
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsComponent } from './clients.component';
import { ServicesSharedModule } from '@appCore/shared/sharedServices.module';

const routes: Routes = [{ path: '', component: ClientsComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ServicesSharedModule],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
