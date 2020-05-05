import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentsComponent } from './appointments.component';
import { CalendarService } from './calendar.service';

const routes: Routes = [{
  path: '**', component: AppointmentsComponent, resolve: {
    chat: CalendarService
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
