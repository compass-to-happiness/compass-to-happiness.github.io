import { useRef, useEffect } from 'react';

const containerStyle = {
  width: '100%',
  height: '100%',
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
