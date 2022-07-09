import { useRef, useEffect, useState } from 'react';

const containerStyle = {
  width: '400px',
  height: '400px',
};

export default function Map({ center, zoom, setNearest, isHidden }) {
  const ref = useRef(null);
  const [mapObj, setMapObj] = useState(null);

  useEffect(() => {
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
          setNearest(results[0]);
        }
      }
    });
  }, [mapObj]);

  return <div ref={ref} id="map" style={{ ...containerStyle, visibility: isHidden ? 'hidden' : 'visible' }} />;
}
