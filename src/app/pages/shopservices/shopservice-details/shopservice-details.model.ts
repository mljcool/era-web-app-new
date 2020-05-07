import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class ShopServiceDetailsModel {
    id: string;
    name: string;
    handle: string;
    description: string;
    categories: string[];
    tags: string[];
    price: number;
    taxRate: number;
    quantity: number;
    hours: string;
    active: boolean;

    /**
     * Constructor
     *
     * @param product
     */
    constructor(product?) {
        product = product || {};
        this.id = product.id || FuseUtils.generateGUID();
        this.name = product.name || '';
        this.handle = product.handle || FuseUtils.handleize(this.name);
        this.description = product.description || '';
        this.categories = product.categories || [];
        this.tags = product.tags || [];
        this.price = product.price || 0;
        this.taxRate = product.taxRate || 0;
        this.quantity = product.quantity || 0;
        this.hours = product.hours || 0;
        this.active = product.active || true;
    }

}
