import { MaterialModule } from '@fuse/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmMapModule } from '@fuse/agMap.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { BookingDetailsServices } from './appointment-details.service';
import { BookingDetailsRoutingModule } from './appointment-details-routing.module';
import { BookingDetailsComponent } from './appointment-details.component';
import { FuseCountdownModule } from '@fuse/components';

@NgModule({
	declarations: [BookingDetailsComponent],
	imports: [
		CommonModule,
		BookingDetailsRoutingModule,
		AgmMapModule,
		FuseSharedModule,
		FuseCountdownModule,
		MaterialModule,
	],
	providers: [BookingDetailsServices],
})
export class BookingDetailsModule {}
