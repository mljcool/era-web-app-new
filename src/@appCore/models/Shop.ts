
export class IShopData {
  uid: string;
  reference: string;
  subtotal: string;
  tax: string;
  discount: string;
  total: string;
  date: string;
  customer: any;
  products: any[];
  status: any[];
  payment: any;

  /**
   * Constructor
   *
   * @param order
   */
  constructor(order?) {
    order = order || {};
    this.subtotal = order.subtotal || 0;
    this.tax = order.tax || 0;
    this.discount = order.discount || 0;
    this.total = order.total || 0;
    this.date = order.date || '';
    this.customer = order.customer || {};
    this.products = order.products || [];
    this.status = order.status || [];
    this.payment = order.payment || {};
  }
}
