import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { getMyOrders } from '@appCore/firebaseRef/OrdersRef';
import moment from 'moment';

@Injectable()
export class EcommerceOrdersService implements Resolve<any> {
	orders: any[];
	onOrdersChanged: BehaviorSubject<any>;
	shopId: string = '';

	/**
	 * Constructor
	 *
	 * @param {HttpClient} _httpClient
	 */
	constructor(private _httpClient: HttpClient) {
		// Set the defaults
		this.onOrdersChanged = new BehaviorSubject({});
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
		return new Promise((resolve, reject) => {
			Promise.all([this.getOrders()]).then(() => {
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

	mapOrders(data, index): any {
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
					id: 13,
					name: 'On pre-order (not paid)',
					color: 'purple-300',
					date: '2018/04/03 10:06:18',
				},
			],
			payment: {
				transactionId: '2a894b9e',
				amount: data.totalAmount,
				method: 'COD',
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
	 * Get orders
	 *
	 * @returns {Promise<any>}
	 */
	getOrders(): Promise<any> {
		return new Promise((resolve, reject) => {
			getMyOrders(this.shopId).onSnapshot((snapshot) => {
				const orders: any = snapshot.docs.map((car) => ({
					key: car.id,
					...car.data(),
				}));
				this.orders = orders.map((data, i) => this.mapOrders(data, i));
				console.log('getOrders', orders);
				this.onOrdersChanged.next(this.orders);
				resolve(this.orders);
			});
		});
	}
}
