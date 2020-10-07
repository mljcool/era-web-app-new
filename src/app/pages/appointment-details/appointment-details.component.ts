import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { acceptBooking, cancelledBooking, getMyBookingDetails } from '@appCore/firebaseRef/AppointmentsRef';
import { getClientCar } from '@appCore/firebaseRef/ProceedAssistanceRef';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { fuelTypeData } from './contants';

@Component({
	selector: 'app-appointment-details',
	templateUrl: './appointment-details.component.html',
	styleUrls: ['./appointment-details.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations,
})
export class BookingDetailsComponent implements OnInit, OnDestroy {
	public origin: any;
	public destination: any;
	public renderOptions = {
		suppressMarkers: true,
	};
	widgets: any;
	dialogRef: any;
	latitude = 7.0514;
	longitude = 125.594772;

	markerOptions = {
		origin: {
			icon: {
				url: 'assets/images/svg/guage.svg',
				scaledSize: {
					height: 50,
					width: 40,
				},
			},
		},
		destination: {
			icon: {
				url: 'assets/images/svg/my-marker.svg',
				scaledSize: {
					height: 50,
					width: 40,
				},
			},
		},
	};

	bookingDetails: any = {
		startDate: {
			toDate: () => {
				return new Date();
			},
		},
		dateCreated: {
			toDate: () => {
				return new Date();
			},
		},
		time: {
			toDate: () => {
				return new Date();
			},
		},
		status: 'CANCELLED',
	};
	clientDetails: any = {};
	clientCar: any = {
		fuelType: {
			label: '',
		},
		fuelName: '',
	};
	getMechanicDetails: any = {};
	getAssistanceName: any = '';
	fuelType = fuelTypeData;
	getApproximate: any = {};
	private unsubscribeAll: Subject<any>;

	constructor(private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar) {
		this.unsubscribeAll = new Subject();
		this.route.queryParams.pipe(takeUntil(this.unsubscribeAll)).subscribe((params) => {
			const { bookingUID } = params;
			console.log('bookingUID', bookingUID);
			this.getMyBookingDetails(bookingUID);
		});
	}

	ngOnInit(): void {}

	ngOnDestroy(): void {}

	getMyBookingDetails(bookingUID): void {
		getMyBookingDetails(bookingUID).onSnapshot((snapshot) => {
			const bookingDetails = snapshot.docs.map((shop) => ({
				key: shop.id,
				...shop.data(),
			}))[0];
			this.bookingDetails = { ...this.bookingDetails, ...bookingDetails };
			console.log('this.bookingDetails', this.bookingDetails);

			const { userUID, userData } = this.bookingDetails;
			// const { userUID, userData } = this.bookingDetails.serviceDetail;
			this.clientDetails = userData;
			getClientCar(userData.id).onSnapshot((snapshot) => {
				const clientCar = snapshot.docs
					.map((client) => ({
						key: client.id,
						...client.data(),
					}))
					.find((car: any) => car.insUsed);
				this.clientCar = { ...this.clientCar, ...clientCar };
				console.log('getClientCar', this.clientCar);
				console.log('fuelType', this.fuelType);
				this.clientCar.fuelName = (this.fuelType.find((fuel) => fuel.value === this.clientCar.fuelType) || {}).label;
			});
		});
	}

	forceArrived(): void {}

	onAccommodate(): void {}

	openSnackBar(message: string) {
		this._snackBar.open(message, 'OK', {
			duration: 2000,
		});
	}

	acceptBooking(): void {
		const { key } = this.bookingDetails;
		acceptBooking(key).then(() => {
			this.openSnackBar('Booking successfully Accepted.');
			const headBack = setTimeout(() => {
				clearTimeout(headBack);
			}, 500);
		});
	}

	cancelBooking(): void {
		const { key } = this.bookingDetails;
		cancelledBooking(key).then(() => {
			this.openSnackBar('Booking successfully Declined.');
			const headBack = setTimeout(() => {
				clearTimeout(headBack);
			}, 500);
		});
	}
}
