import { useRef, useEffect, useState } from 'react';

export default function Map({ center, zoom, setNearestLocation }) {
  const ref = useRef(null);
  const [mapObj, setMapObj] = useState(null);

  useEffect(() => {
    if (window.google?.maps?.Map == null) {
      console.log('Waiting for Google Maps API to load.');
      return;
    }
    if (ref.current == null) {
      console.log('ref.current is null');
      return;
    }
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
      disableDefaultUI: true,
    });
    setMapObj(map);
  }, [center, zoom, ref]);

  useEffect(() => {
    if (mapObj == null) {
      console.log('mapObj is null');
      return;
    }
    let request = {
      query: 'Ice cream',
      fields: ['name', 'geometry'],
    };

    let service = new window.google.maps.places.PlacesService(mapObj);
    service.findPlaceFromQuery(request, (results, status) => {
      if (status === 'OK') {
        if (results.length > 0) {
          setNearestLocation({
            name: results[0].name,
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          });
        }
      }
    });
  }, [mapObj, setNearestLocation]);

  return <div ref={ref} id="map" className="w-full h-full" />;
}
