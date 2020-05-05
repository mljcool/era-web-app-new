import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { OrderDetailsService } from './order-details.service';
import { OrderDetails } from './order-details.model';
import { orderStatuses } from './order-details-statuses';

@Component({
    selector: 'order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
    order: OrderDetails;
    orderStatuses: any;
    statusForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {EcommerceOrderService} _ecommerceOrderService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _ecommerceOrderService: OrderDetailsService,
        private _formBuilder: FormBuilder
    ) {
        // Set the defaults
        this.order = new OrderDetails();
        this.orderStatuses = orderStatuses;

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
        // Subscribe to update order on changes
        this._ecommerceOrderService.onOrderChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(order => {
                this.order = new OrderDetails(order);
            });

        this.statusForm = this._formBuilder.group({
            newStatus: ['']
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update status
     */
    updateStatus(): void {
        const newStatusId = Number.parseInt(this.statusForm.get('newStatus').value);

        if (!newStatusId) {
            return;
        }

        const newStatus = this.orderStatuses.find((status) => {
            return status.id === newStatusId;
        });

        newStatus['date'] = new Date().toString();

        this.order.status.unshift(newStatus);
    }
}
