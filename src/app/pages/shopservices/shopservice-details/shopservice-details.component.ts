import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, Observable } from 'rxjs';
import { takeUntil, startWith, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { ShopServiceDetailsService } from './shopservice-details.service';
import { ShopServiceDetailsModel } from './shopservice-details.model';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { ProductDetails } from 'app/pages/products/product-details/product-details.model';

@Component({
    selector: 'shopservice-details',
    templateUrl: './shopservice-details.component.html',
    styleUrls: ['./shopservice-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ShopServiceDetailsComponent implements OnInit, OnDestroy {
    serviceModel: ShopServiceDetailsModel;
    pageType: string;
    serviceForm: FormGroup;
    producsNeeded: ProductDetails[] = [];
    totalValues: number = 0;


    visible = true;
    selectable = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];

    categoriestCtrl = new FormControl();
    filteredCategories: Observable<string[]>;
    serviceCategory: string[] = ['Lemon'];
    allCategories: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];


    personneltCtrl = new FormControl();
    filteredPersonnels: Observable<string[]>;
    servicePersonnel: string[] = ['Sample'];
    allPersonnel: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

    @ViewChild('personnelInput') personnelInput: ElementRef<HTMLInputElement>;
    @ViewChild('categoriesInput') categoriesInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;
    @ViewChild('auto') matAutocompletePersonnel: MatAutocomplete;


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {EcommerceProductService} _shopServiceDetailsService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _shopServiceDetailsService: ShopServiceDetailsService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar
    ) {
        // Set the default
        this.serviceModel = new ShopServiceDetailsModel();

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this._shopServiceDetailsService.setProducts.
            pipe(takeUntil(this._unsubscribeAll))
            .subscribe(products => {

                const isExist = this.producsNeeded.some(data => data.id === products.id);
                console.log(isExist);
                if (isExist) {
                    this._matSnackBar.open('Product already added', 'OK', {
                        verticalPosition: 'top',
                        duration: 1000
                    });
                    return;
                }

                if (!!Object.keys(products).length) {
                    this._matSnackBar.open('Product added', 'OK', {
                        verticalPosition: 'top',
                        duration: 1000
                    });
                    products.srvcQty = 1;
                    this.producsNeeded.push(products);
                    const uniqueArray = this.producsNeeded.filter((item, pos, self) => {
                        return self.indexOf(item) == pos;
                    })
                    this.computeValues();
                }
            })

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to update serviceModel on changes
        this._shopServiceDetailsService.onServiceChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(serviceModel => {

                if (serviceModel) {
                    this.serviceModel = new ShopServiceDetailsModel(serviceModel);
                    this.pageType = 'edit';
                }
                else {
                    this.pageType = 'new';
                    this.serviceModel = new ShopServiceDetailsModel();
                }

                this.serviceForm = this.createServiceForm();
            });




        this.filteredCategories = this.categoriestCtrl.valueChanges.pipe(
            startWith(null),
            map((category: string | null) => category ? this._filter(category) : this.allCategories.slice())).pipe(takeUntil(this._unsubscribeAll));

        // =====================================

        this.filteredPersonnels = this.personneltCtrl.valueChanges.pipe(
            startWith(null),
            map((personnel: string | null) => personnel ? this._filterPersonnel(personnel) : this.allPersonnel.slice())).pipe(takeUntil(this._unsubscribeAll));


    }

    computeValues() {
        this.totalValues = 0;
        const totalvalues = this.producsNeeded.reduce((result, item: any) => {
            const sum: any = parseFloat(item.price) * parseInt(item.srvcQty, 10);
            return result + sum;
        }, 0);
        const servicePrice: any = this.serviceForm.get('servicePrice').value;
        this.totalValues = totalvalues;

        const roundOftotalValues = FuseUtils.round(this.totalValues, 2);
        const roundOfgrandTotal = FuseUtils.round((roundOftotalValues + parseInt(servicePrice)), 2);

        this.serviceForm.patchValue({ totalPrice: roundOftotalValues });
        this.serviceForm.patchValue({ grandTotal: roundOfgrandTotal });
    }

    onItemsQty(type: string, item) {
        const itemIndex = this.producsNeeded.indexOf(item);

        console.log(type);
        if (type === 'remove') {
            const deductedQty = this.producsNeeded[itemIndex].srvcQty - 1;
            if (deductedQty < 1) {
                return;
            }
            this.producsNeeded[itemIndex].srvcQty = deductedQty;
        } else {
            const addeddQty = this.producsNeeded[itemIndex].srvcQty + 1;
            const origQty = this.producsNeeded[itemIndex].origQty;
            if (addeddQty > origQty) {
                return;
            }
            this.producsNeeded[itemIndex].srvcQty = addeddQty;
        }

        setTimeout(() => {
            this.computeValues();

        }, 200)
        // console.log(items);

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    openProducFinder(): void {
        this._shopServiceDetailsService.openModalProductFinder().subscribe(response => {
            this.computeValues();
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
            let index = this.serviceCategory.indexOf(value.trim())
            if (index == -1)
                this.serviceCategory.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.categoriestCtrl.setValue(null);
    }

    remove(fruit: string): void {
        const index = this.serviceCategory.indexOf(fruit);

        if (index >= 0) {
            this.serviceCategory.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {

        if ((event.option.viewValue || '').trim()) {
            let index = this.serviceCategory.indexOf(event.option.viewValue.trim())
            if (index == -1)
                this.serviceCategory.push(event.option.viewValue.trim());
        }

        this.categoriesInput.nativeElement.value = '';
        this.categoriestCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.allCategories.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
    }


    // ---------------------------------------------------------------------


    addPersonnel(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
            let index = this.servicePersonnel.indexOf(value.trim())
            if (index == -1)
                this.servicePersonnel.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.personneltCtrl.setValue(null);
    }

    removePersonnel(personnel: string): void {
        const index = this.servicePersonnel.indexOf(personnel);

        if (index >= 0) {
            this.servicePersonnel.splice(index, 1);
        }
    }

    selectedPersonnel(event: MatAutocompleteSelectedEvent): void {

        if ((event.option.viewValue || '').trim()) {
            let index = this.servicePersonnel.indexOf(event.option.viewValue.trim())
            if (index == -1)
                this.servicePersonnel.push(event.option.viewValue.trim());
        }

        this.personnelInput.nativeElement.value = '';
        this.personneltCtrl.setValue(null);
    }

    private _filterPersonnel(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.allPersonnel.filter(personnel => personnel.toLowerCase().indexOf(filterValue) === 0);
    }


    /**
     * Create serviceModel form
     *
     * @returns {FormGroup}
     */
    createServiceForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.serviceModel.id],
            name: [this.serviceModel.name],
            description: [this.serviceModel.description],
            categories: [this.serviceModel.categories],
            personnels: [this.serviceModel.personnels],
            products: [this.serviceModel.products],
            hours: [this.serviceModel.hours],
            active: [this.serviceModel.active],
            servicePrice: [this.serviceModel.servicePrice],
            totalPrice: new FormControl({ value: this.serviceModel.totalPrice, disabled: true }),
            grandTotal: new FormControl({ value: this.serviceModel.grandTotal, disabled: true }),
        });
    }


    removeItems(item) {
        const index = this.producsNeeded.indexOf(item);
        console.log(index);
        if (index >= 0) {
            this.producsNeeded.splice(index, 1);
            this.computeValues();
        }
    }



    /**
     * Save serviceModel
     */
    saveProduct(): void {
        const data = this.serviceForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        this._shopServiceDetailsService.saveProduct(data)
            .then(() => {

                // Trigger the subscription with new data
                this._shopServiceDetailsService.onServiceChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Shop service saved', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            });
    }


    /**
     * Add serviceModel
     */
    addService(): void {

        const newData = this.structFormatData();
        setTimeout(() => {
            this._shopServiceDetailsService.
                insertNewServices(newData).then(() => {

                    //         // Show the success message
                    this._matSnackBar.open('ShopServiceDetailsModel added', 'OK', {
                        verticalPosition: 'top',
                        duration: 2000
                    });

                })
        }, 100);
        // this._shopServiceDetailsService.addProduct(data)
        //     .then(() => {

        //         // Trigger the subscription with new data
        //         this._shopServiceDetailsService.onServiceChanged.next(data);

        //         // Show the success message
        //         this._matSnackBar.open('ShopServiceDetailsModel added', 'OK', {
        //             verticalPosition: 'top',
        //             duration: 2000
        //         });

        //         // Change the location with new one
        //         this._location.go('apps/e-commerce/products/' + this.serviceModel.id + '/' + this.serviceModel.handle);
        //     });
    }


    structFormatData() {
        const data = this.serviceForm.getRawValue();
        data.categories = this.serviceCategory;
        data.personnels = this.servicePersonnel;
        data.products = this.producsNeeded.map(product => ({ id: product.id, name: product.name, quantity: product.srvcQty, price: product.price }));
        data.handle = FuseUtils.handleize(data.name);
        data.shopuid = localStorage.getItem('shopId');

        console.log(data);
        console.log(this.producsNeeded);
        return data;

    }

}
