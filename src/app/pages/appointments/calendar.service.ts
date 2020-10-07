import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { getMyBookings } from '@appCore/firebaseRef/AppointmentsRef';
import { startOfDay, subDays, addDays, endOfMonth, addHours } from 'date-fns';

@Injectable()
export class CalendarService implements Resolve<any> {
	events: any;
	onEventsUpdated: Subject<any>;
	shopId: string = '';
	/**
	 * Constructor
	 *
	 * @param {HttpClient} _httpClient
	 */
	constructor(private _httpClient: HttpClient) {
		// Set the defaults
		this.onEventsUpdated = new Subject();
		this.shopId = localStorage.getItem('shopId');
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Resolver
	 *
	 * @param {ActivatedRouteSnapshot} route
	 * @param {RouterStateSnapshot} state
	 * @returns {Observable<any> | Promise<any> | any}
	 */
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
		return new Promise((resolve, reject) => {
			Promise.all([this.getEvents()]).then(([events]: [any]) => {
				resolve();
			}, reject);
		});
	}

	/**
	 * Get events
	 *
	 * @returns {Promise<any>}
	 */

	getHexColorStatus(status) {
		let hexColor = '#ffa263';
		switch (status) {
			case 'PENDING':
				hexColor = '#ffa263';
				break;
			case 'CANCELLED':
				hexColor = '#f22222';
				break;
			case 'ACCEPTED':
				hexColor = '#56ca70';
				break;
			default:
				hexColor = '#ffa263';
		}
		return hexColor;
	}

	mapDataEvents(data: any = {}) {
		const startDate = data.startDate.toDate();
		const endDate = data.endDate.toDate();
		const { address } = data.userData;
		const { name } = data.serviceDetail;
		return {
			title: name,
			start: startOfDay(new Date(startDate)),
			end: endDate,
			allDay: true,
			color: {
				primary: this.getHexColorStatus(data.status),
				secondary: '#D1C4E9',
			},
			resizable: {
				beforeStart: true,
				afterEnd: true,
			},
			draggable: false,
			meta: {
				location: address.formattedAddres,
				notes: data.notes,
			},
			moreDetails: data,
			additionalContact: data.AdditionalContact,
		};
	}

	getEvents(): Promise<any> {
		return new Promise((resolve, reject) => {
			getMyBookings(this.shopId).onSnapshot((snapshot) => {
				// console.log('getEvents', JSON.stringify(response, null, 2));
				const bookings: any = snapshot.docs.map((car) => ({
					key: car.id,
					...car.data(),
				}));
				this.events = bookings.map((data) => this.mapDataEvents(data));
				console.log('eventSource', this.events);
				// this.bookings = bookings;
				// bookings.forEach((element, index) => {
				// 	console.log('startDate', element.startDate.toDate());
				// 	console.log('endDate', element.endDate.toDate());
				// 	const startDate = element.startDate.toDate();
				// 	const endDate = element.endDate.toDate();
				// 	const serviceName = element.serviceDetail.name;
				// 	const status = element.status;
				// 	this.events.push({
				// 		start: startDate,
				// 		end: endDate,
				// 		text: serviceName + ' - ' + `(${status})`,
				// 		color: this.getHexColorStatus(status),
				// 		details: element,
				// 	});
				// 	console.log('eventSource', this.bookings);
				// });
				this.onEventsUpdated.next(this.events);
				resolve(this.events);
			});
		});
	}

	/**
	 * Update events
	 *
	 * @param events
	 * @returns {Promise<any>}
	 */
	updateEvents(events): Promise<any> {
		return new Promise((resolve, reject) => {
			this._httpClient
				.post('api/calendar/events', {
					id: 'events',
					data: [...events],
				})
				.subscribe((response: any) => {
					this.getEvents();
				}, reject);
		});
	}
}
