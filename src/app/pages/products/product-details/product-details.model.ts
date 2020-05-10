import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class ProductDetails {
    id: string;
    name: string;
    handle: string;
    description: string;
    categories: string[];
    price: number;
    taxRate: number;
    quantity: number;
    origQty: number;
    sku: string;
    width: string;
    height: string;
    depth: string;
    weight: string;
    extraShippingFee: number;
    srvcQty: number;
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
        this.price = product.price || 0;
        this.taxRate = product.taxRate || 0;
        this.quantity = product.quantity || 0;
        this.origQty = product.origQty || 0;
        this.sku = product.sku || 0;
        this.width = product.width || 0;
        this.height = product.height || 0;
        this.depth = product.depth || 0;
        this.weight = product.weight || 0;
        this.extraShippingFee = product.extraShippingFee || 0;
        this.srvcQty = product.srvcQty || 0;
        this.active = product.active || true;
    }

}
