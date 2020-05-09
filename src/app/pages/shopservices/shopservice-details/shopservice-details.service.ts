import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductFinderModalComponent } from '@appCore/modals/productFinder/productFinder.component';

import {
    AngularFirestore,
    AngularFirestoreCollection,
} from '@angular/fire/firestore';


@Injectable({
    providedIn: 'root'
})
export class ShopServiceDetailsService implements Resolve<any>
{
    private dbPath = '/newShopServices';
    newShopServicesRef: AngularFirestoreCollection<any> = null;


    routeParams: any;
    product: any;
    dialogRef: any;
    onServiceChanged: BehaviorSubject<any>;
    setProducts: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private _matDialog: MatDialog,
        private db: AngularFirestore
    ) {

        this.newShopServicesRef = db.collection(this.dbPath);
        // Set the defaults
        this.onServiceChanged = new BehaviorSubject({});
        this.setProducts = new BehaviorSubject({});
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
                this.onServiceChanged.next(false);
                resolve(false);
            }
            else {
                this._httpClient.get('api/e-commerce-products/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.product = response;
                        this.onServiceChanged.next(this.product);
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

    openModalProductFinder(): Observable<any> {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.autoFocus = true;
        dialogConfig.panelClass = 'product-finder-dialogs';
        dialogConfig.width = '900px';
        dialogConfig.maxHeight = '800px';

        this.dialogRef = this._matDialog.open(ProductFinderModalComponent, dialogConfig);

        return this.dialogRef.afterClosed()
    }

    insertNewServices(data: any): Promise<any> {
        return this.newShopServicesRef.add(data);
    }
}
