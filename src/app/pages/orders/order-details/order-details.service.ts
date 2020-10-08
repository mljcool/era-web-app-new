import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { getMyOrder, getMyOrders } from '@appCore/firebaseRef/OrdersRef';
import moment from 'moment';

@Injectable()
export class OrderDetailsService implements Resolve<any> {
	routeParams: any;
	order: any;
	shopId: any = '';
	onOrderChanged: BehaviorSubject<any>;

	/**
	 * Constructor
	 *
	 * @param {HttpClient} _httpClient
	 */
	constructor(private _httpClient: HttpClient) {
		// Set the defaults
		this.onOrderChanged = new BehaviorSubject({});
		this.shopId = localStorage.getItem('shopId');
	}

	/**
	 * Resolver
	 *
	 * @param {ActivatedRouteSnapshot} route
	 * @param {RouterStateSnapshot} state
	 * @returns {Observable<any> | Promise<any> | any}
	 */
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
		this.routeParams = route.params;

		return new Promise((resolve, reject) => {
			Promise.all([this.getOrder()]).then(() => {
				resolve();
			}, reject);
		});
	}

	mapProducts(data, index): any {
		return {
			id: data.id,
			name: data.name,
			price: data.price,
			quantity: data.amount,
			total: data.amount * data.price,
			image: null,
		};
	}

	mapOrders(data): any {
		const { userData, myCart } = data;
		const productsCart = myCart.map((prods, i) => this.mapProducts(prods, i));
		return {
			id: data.transactionUID,
			reference: data.transactionUID,
			subtotal: '0',
			tax: '0',
			discount: '0',
			total: data.totalAmount,
			date: moment(data.dateCreated.toDate()).format('MM/DD/YYYY hh:mm A'),
			customer: {
				id: 1,
				firstName: userData.givenName,
				lastName: userData.familyName,
				avatar: 'assets/images/avatars/Abbott.jpg',
				company: null,
				jobTitle: null,
				email: userData.email,
				phone: userData.mobileNumber,
				invoiceAddress: {
					address: userData.address.formattedAddres,
					lat: userData.address.latitude,
					lng: userData.address.longitude,
				},
				shippingAddress: {
					address: userData.address.formattedAddres,
					lat: userData.address.latitude,
					lng: userData.address.longitude,
				},
			},
			products: productsCart,
			status: [
				{
					id: data.transactionUID,
					name: 'On pre-order (not paid)',
					color: 'purple-300',
					date: moment(data.dateCreated.toDate()).format('MM/DD/YYYY hh:mm A'),
				},
			],
			payment: {
				transactionId: data.transactionUID,
				amount: data.totalAmount,
				method: data.orderType,
				date: moment(data.dateCreated.toDate()).format('MM/DD/YYYY hh:mm A'),
			},
			shippingDetails: [
				{
					tracking: '',
					carrier: 'TNT',
					weight: '10.44',
					fee: '7.00',
					date: moment(data.dateCreated.toDate()).format('MM/DD/YYYY hh:mm A'),
				},
			],
		};
	}

	/**
	 * Get order
	 *
	 * @returns {Promise<any>}
	 */
	getOrder(): Promise<any> {
		return new Promise((resolve, reject) => {
			getMyOrder(this.routeParams.id).onSnapshot((snapshot) => {
				const order: any = snapshot.docs.map((car) => ({
					key: car.id,
					...car.data(),
				}))[0];
				this.order = this.mapOrders(order);
				console.log('getOrders', order);
				this.onOrderChanged.next(this.order);
				resolve(this.order);
			});
		});
	}

	/**
	 * Save order
	 *
	 * @param order
	 * @returns {Promise<any>}
	 */
	saveOrder(order): Promise<any> {
		return new Promise((resolve, reject) => {
			this._httpClient.post('api/e-commerce-orders/' + order.id, order).subscribe((response: any) => {
				resolve(response);
			}, reject);
		});
	}

	/**
	 * Add order
	 *
	 * @param order
	 * @returns {Promise<any>}
	 */
	addOrder(order): Promise<any> {
		return new Promise((resolve, reject) => {
			this._httpClient.post('api/e-commerce-orders/', order).subscribe((response: any) => {
				resolve(response);
			}, reject);
		});
	}
}
