import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';

import { MatColors } from '@fuse/mat-colors';
import { CalendarEventModel } from '../event.model';
import { acceptBooking, cancelledBooking } from '@appCore/firebaseRef/AppointmentsRef';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
	selector: 'calendar-event-form-dialog',
	templateUrl: './event-form.component.html',
	styleUrls: ['./event-form.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class CalendarEventFormDialogComponent {
	action: string;
	event: CalendarEvent;
	newData: any = {};
	eventForm: FormGroup;
	dialogTitle: string;
	presetColors = MatColors.presets;

	/**
	 * Constructor
	 *
	 * @param {MatDialogRef<CalendarEventFormDialogComponent>} matDialogRef
	 * @param _data
	 * @param {FormBuilder} _formBuilder
	 */
	constructor(
		public matDialogRef: MatDialogRef<CalendarEventFormDialogComponent>,
		@Inject(MAT_DIALOG_DATA) private _data: any,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private router: Router
	) {
		this.event = _data.event;
		this.action = _data.action;
		this.newData = _data.event;

		if (this.action === 'edit') {
			this.dialogTitle = this.event.title;
		} else {
			this.dialogTitle = 'New Event';
			this.event = new CalendarEventModel({
				start: _data.date,
				end: _data.date,
			});
		}
		console.log('CalendarEventFormDialogComponent', this._data);

		this.eventForm = this.createEventForm();
	}

	acceptBooking(): void {
		const { key } = this.newData.moreDetails;
		acceptBooking(key).then(() => {
			this.openSnackBar('Booking successfully Accepted.');
			const headBack = setTimeout(() => {
				this.matDialogRef.close();
				clearTimeout(headBack);
			}, 500);
		});
	}

	cancelBooking(): void {
		const { key } = this.newData.moreDetails;
		cancelledBooking(key).then(() => {
			this.openSnackBar('Booking successfully Declined.');
			const headBack = setTimeout(() => {
				this.matDialogRef.close();
				clearTimeout(headBack);
			}, 500);
		});
	}

	openSnackBar(message: string) {
		this._snackBar.open(message, 'OK', {
			duration: 2000,
		});
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Create the event form
	 *
	 * @returns {FormGroup}
	 */
	createEventForm(): FormGroup {
		return new FormGroup({
			title: new FormControl(this.event.title),
			start: new FormControl(this.event.start),
			end: new FormControl(this.event.end),
			allDay: new FormControl(this.event.allDay),
			additionalContact: new FormControl(this.newData.additionalContact),
			color: this._formBuilder.group({
				primary: new FormControl(this.event.color.primary),
				secondary: new FormControl(this.event.color.secondary),
			}),
			meta: this._formBuilder.group({
				location: new FormControl(this.event.meta.location),
				notes: new FormControl(this.event.meta.notes),
			}),
		});
	}

	viewDetails(): void {
		const { bookingUID } = this.newData.moreDetails;
		this.router.navigate(['/appointment-details'], { queryParams: { bookingUID: bookingUID } });
		const timerStopper = setTimeout(() => {
			this.matDialogRef.close();
			clearTimeout(timerStopper);
		}, 500);
	}
}
