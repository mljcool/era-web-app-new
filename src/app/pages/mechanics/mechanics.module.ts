import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MechanicsRoutingModule } from './mechanics-routing.module';
import { MechanicsComponent } from './mechanics.component';


@NgModule({
  declarations: [MechanicsComponent],
  imports: [
    CommonModule,
    MechanicsRoutingModule
  ]
})
export class MechanicsModule { }
