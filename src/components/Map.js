import { useRef, useEffect } from 'react';

const containerStyle = {
  width: '400px',
  height: '400px',
};

export default function Map({ center, zoom }) {
  const ref = useRef(null);

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
      disableDefaultUI: true,
    });
  }, [center, zoom, ref]);
  return <div ref={ref} id="map" style={containerStyle} />;
}
