export interface Location {
  latitude: string;
  longitude: string;
}
export interface IAssistance {

  assistanceId: string | number;
  userId: string | number;
  shopId: string;
  serviceId: string;
  type: string;
  status: string;
  location: Location;
  date: string | any;
}