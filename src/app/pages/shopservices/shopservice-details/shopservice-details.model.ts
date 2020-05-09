
import { FuseUtils } from '@fuse/utils';

export class ShopServiceDetailsModel {
    id: string;
    name: string;
    handle: string;
    description: string;
    categories: string[];
    personnels: string[];
    products: string[];
    price: number;
    taxRate: number;
    quantity: number;
    servicePrice: number;
    srvcQty: number;
    totalPrice: number;
    grandTotal: number;
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
        this.personnels = product.personnels || [];
        this.products = product.products || [];
        this.taxRate = product.taxRate || 0;
        this.quantity = product.quantity || 0;
        this.hours = product.hours || 0;
        this.active = product.active || true;
        this.price = product.price || 0;
        this.servicePrice = product.servicePrice || 0;
        this.totalPrice = product.totalPrice || 0;
        this.grandTotal = product.grandTotal || 0;
        this.srvcQty = product.srvcQty || 0;
    }

}
