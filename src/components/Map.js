import { useRef, useEffect, useState } from 'react';

export default function Map({
  center,
  zoom,
  setNearestLocation,
  keyword,
  currentLocation,
  openNow = true,
  rankBy = 'distance',
  placeType = 'food',
}) {
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

    const request = {
      keyword,
      location: currentLocation,
      openNow,
      rankBy: rankBy === 'distance' ? window.google.maps.places.RankBy.DISTANCE : rankBy,
      type: placeType,
    };

    const placesService = new window.google.maps.places.PlacesService(mapObj);
    placesService.nearbySearch(request, (results, status) => {
      if (status === 'OK' && results.length > 0) {
        const {
          name,
          rating,
          user_ratings_total,
          geometry: { location },
        } = results[0];
        setNearestLocation({
          name,
          rating: user_ratings_total === 0 ? null : rating,
          lat: location.lat(),
          lng: location.lng(),
        });
      }
    });
  }, [mapObj, setNearestLocation, keyword, currentLocation, openNow, rankBy, placeType]);

  return <div ref={ref} id="map" className="w-full h-full" />;
}
