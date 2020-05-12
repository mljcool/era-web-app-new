export interface IShop {
  address?: string;
  dateCreated?: string | any;
  domain?: string;
  email?: string;
  founded?: string;
  mobile?: string;
  name?: string;
  secondName?: string;
  notes?: string;
  phone?: string;
  shopLocation?: {
    latitude: number,
    longitude: number
  },
  status?: string;
  uid?: string;
  key?: string;
}