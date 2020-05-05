

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments.component';
import { CalendarEventFormDialogComponent } from './event-form/event-form.component';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MaterialModule } from '@fuse/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { CalendarService } from './calendar.service';

@NgModule({
  declarations: [AppointmentsComponent,
    CalendarEventFormDialogComponent],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    MaterialModule,

    AngularCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),

    FuseSharedModule
  ],
  providers: [
    CalendarService
  ],
  entryComponents: [
    CalendarEventFormDialogComponent
  ]
})
export class AppointmentsModule { }
