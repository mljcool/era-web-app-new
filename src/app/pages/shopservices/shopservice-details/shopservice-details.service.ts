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

import { StoreServices } from '@appCore/services/store.services';


@Injectable({
    providedIn: 'root'
})
export class ShopServiceDetailsService implements Resolve<any>
{
    private dbPath = '/newShopServices';
    newShopServicesRef: AngularFirestoreCollection<any> = null;


    routeParams: any;
    myServices: any;
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
        private db: AngularFirestore,
        private _StoreServices: StoreServices,
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
                this.getMyServices()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get myServices
     *
     * @returns {Promise<any>}
     */
    getMyServices(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === 'new') {
                this.onServiceChanged.next(false);
                resolve(false);
            }
            else {
                this._StoreServices.onServicesAutoShop.subscribe((response: any) => {
                    this.myServices = response.find(srvc => srvc.id === this.routeParams.id);
                    this.onServiceChanged.next(this.myServices);
                    resolve(response);
                }, reject);
            }
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
