import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { StoreServices } from '@appCore/services/store.services';
import {
    AngularFirestore,
    AngularFirestoreCollection,
} from '@angular/fire/firestore';

@Injectable()
export class ProductDetailsService implements Resolve<any>
{
    routeParams: any;
    product: any;
    onProductChanged: BehaviorSubject<any>;

    private dbPath = '/newShopProducts';
    newShopProducts: AngularFirestoreCollection<any> = null;


    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private db: AngularFirestore,
        private _StoreServices: StoreServices,
    ) {
        this.newShopProducts = db.collection(this.dbPath);
        // Set the defaults
        this.onProductChanged = new BehaviorSubject({});
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

            Promise.all([
                this.getProduct()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get product
     *
     * @returns {Promise<any>}
     */
    getProduct(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === 'new') {
                this.onProductChanged.next(false);
                resolve(false);
            }
            else {

                this._StoreServices.onProductsAutoShop.subscribe((response: any) => {
                    this.product = response.find(srvc => srvc.id === this.routeParams.id);
                    this.onProductChanged.next(this.product);
                    resolve(response);
                }, reject);
            }
        });
    }

    /**
     * Save product
     *
     * @param product
     * @returns {Promise<any>}
     */
    saveProduct(product): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/e-commerce-products/' + product.id, product)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add product
     *
     * @param product
     * @returns {Promise<any>}
     */
    addProduct(product): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/e-commerce-products/', product)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    addNewProduct(data: any): Promise<any> {
        return this.newShopProducts.add(data);
    }
}
