export const calculateDistanceNearest = (origin: any, destination: any) => {
  const directionsService = new google.maps.DirectionsService();
  const request = {
    origin: new google.maps.LatLng(origin.lat, origin.lng), // LatLng|string
    destination: new google.maps.LatLng(destination.lat, destination.lng), // LatLng|string
    travelMode: google.maps.TravelMode.DRIVING,
  };
  return new Promise((resolve) => {
    directionsService.route(request, (response, status) => {
      if (status == 'OK') {
        const point = response.routes[0].legs[0];
        resolve({
          esitamteTravelTime: point.duration.text,
          distanceKM: point.distance.text,
          writtenAddress: point.start_address,
        });
      }
    });
  });
};
