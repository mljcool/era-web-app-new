
export interface CustomMarkersAndSize {
  url: string;
  scaledSize: {
    width: number;
    height: number;
  };
}
export interface Marker {
  lat: number;
  lng: number;
  label?: string;
  shopName?: string;
  draggable: boolean;
  iconUrl: CustomMarkersAndSize;
  assistanceData?: any;
}