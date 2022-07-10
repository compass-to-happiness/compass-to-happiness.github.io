import { useEffect, useState } from 'react';

export default function MarkerCircle(options) {
  const [circle, setCircle] = useState();

  useEffect(() => {
    if (!circle) {
      setCircle(
        new window.google.maps.Circle({
          fillColor: '#4286f5',
          fillOpacity: 0.2,
          strokeColor: '#4286f5',
          strokeWeight: 0.5,
        }),
      );
    }

    // remove marker from map on unmount
    return () => {
      if (circle) {
        circle.setMap(null);
      }
    };
  }, [circle]);
  useEffect(() => {
    if (circle) {
      circle.setOptions({
        fillColor: '#4286f5',
        fillOpacity: 0.2,
        strokeColor: '#4286f5',
        strokeWeight: 0.5,
        ...options,
      });
    }
  }, [circle, options]);
  return null;
}
