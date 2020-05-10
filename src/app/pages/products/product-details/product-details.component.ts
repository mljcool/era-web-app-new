

import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, Observable } from 'rxjs';
import { takeUntil, startWith, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { ProductDetailsService } from './product-details.service';
import { ProductDetails } from './product-details.model';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { categories, Catergories } from '@appCore/constants/categories';
import Swal from 'sweetalert2';
@Component({
    selector: 'e-commerce-product',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
    product: ProductDetails;
    pageType: string;
    productForm: FormGroup;


    visible = true;
    selectable = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];

    // Private
    private _unsubscribeAll: Subject<any>;
    categoriestCtrl = new FormControl();
    filteredCategories: Observable<Catergories[]>;
    productCatergory: Catergories[] = [categories[0]];
    allCategories: Catergories[] = categories;

    @ViewChild('categoriesInput') categoriesInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;


    /**
     * Constructor
     *
     * @param {EcommerceProductService} _ecommerceProductService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _ecommerceProductService: ProductDetailsService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar
    ) {
        // Set the default
        this.product = new ProductDetails();

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to update product on changes
        this._ecommerceProductService.onProductChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(product => {

                if (product) {
                    this.product = new ProductDetails(product);
                    this.pageType = 'edit';
                }
                else {
                    this.pageType = 'new';
                    this.product = new ProductDetails();
                }

                this.productForm = this.createProductForm();
            });

        this.filteredCategories = this.categoriestCtrl.valueChanges.pipe(
            startWith(null),
            map((category: Catergories | null) => !!(category || {}).value ? this._filter(category.value) : this.allCategories.slice()))
            .pipe(takeUntil(this._unsubscribeAll));
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    remove(category: Catergories): void {

        const index = this.productCatergory.indexOf(category);

        if (index >= 0) {
            this.productCatergory.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        if ((event.option.viewValue || '').trim()) {
            let index = this.productCatergory.indexOf(event.option.value);
            if (index == -1)
                this.productCatergory.push(event.option.value);
        }

        this.categoriesInput.nativeElement.value = '';
        this.categoriestCtrl.setValue(null);
    }

    private _filter(filterValue: number): Catergories[] {

        const filteredValues = this.allCategories.filter(category => category.value === filterValue)

        return filteredValues;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create product form
     *
     * @returns {FormGroup}
     */
    createProductForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.product.id],
            name: [this.product.name],
            handle: [this.product.handle],
            description: [this.product.description],
            categories: [this.product.categories],
            price: [this.product.price],
            taxRate: [this.product.taxRate],
            quantity: [this.product.quantity],
            sku: [this.product.sku],
            width: [this.product.width],
            height: [this.product.height],
            depth: [this.product.depth],
            weight: [this.product.weight],
            extraShippingFee: [this.product.extraShippingFee],
            active: [this.product.active]
        });
    }

    /**
     * Save product
     */
    saveProduct(): void {
        const data = this.productForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        this._ecommerceProductService.saveProduct(data)
            .then(() => {

                // Trigger the subscription with new data
                this._ecommerceProductService.onProductChanged.next(data);

                // Show the success message
                this._matSnackBar.open('ProductDetails saved', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            });
    }

    /**
     * Add product
     */
    addProduct(): void {
        const data = this.productForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);
        data.categories = this.productCatergory;
        data.shopuid = localStorage.getItem('shopId');

        console.log('addNew', data);

        this._ecommerceProductService.addNewProduct(data)
            .then(() => {

                // Trigger the subscription with new data
                this._ecommerceProductService.onProductChanged.next(data);


                Swal.fire({
                    icon: 'success',
                    title: 'Your product has been saved',
                    showConfirmButton: false,
                    timer: 900
                })


                // Change the location with new one
                this._location.go('/products');
            });
    }
}
