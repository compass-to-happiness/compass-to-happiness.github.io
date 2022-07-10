import { createContext, useContext, useEffect, useState } from 'react';

const GeoContext = createContext({
  lat: -1,
  lng: -1,
  accuracy: -1,
  errorMessage: 'Loading...',
});

export const useGeo = () => useContext(GeoContext);

export const GeoProvider = ({ children }) => {
  const [lat, setLat] = useState(-1);
  const [lng, setLng] = useState(-1);
  const [accuracy, setAccuracy] = useState(-1);
  const [errorMessage, setErrorMessage] = useState('Loading...');

  useEffect(() => {
    navigator.geolocation.watchPosition(
      (pos) => {
        setErrorMessage(null);
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        setAccuracy(pos.coords.accuracy);
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setErrorMessage('Geolocation permission was denied by the user.');
          return;
        }
        setErrorMessage(err.message);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, []);

  return <GeoContext.Provider value={{ lat, lng, accuracy, errorMessage }} children={children} />;
};
