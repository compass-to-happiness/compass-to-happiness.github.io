import Compass from '../components/Compass';
import Map from '../components/Map';
import backArrow from '../images/back-arrow.png';
import { useState } from 'react';
import { ReactComponent as PinkBlob } from '../images/pink-blob-rotated.svg';
import MapToggleButton from '../components/MapToggleButton';
import Marker from '../components/Marker';
import { useGeo } from '../context/GeoContext';
import { useCompass } from '../context/CompassContext';

import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';
import MarkerCircle from '../components/MarkerCircle';

export default function CompassPage({ changeView, selectedKeyword }) {
  const [isMap, setIsMap] = useState(false);
  const [nearestLocation, setNearestLocation_] = useState(null);
  const { errorMessage: errorMessageCompass } = useCompass();
  const { lat, lng, accuracy, errorMessage: errorMessageGeo } = useGeo();
  const compassAngle = nearestLocation
    ? window.google.maps.geometry.spherical.computeHeading({ lat, lng }, nearestLocation)
    : 0;
  const distanceFromLocation = nearestLocation
    ? window.google.maps.geometry.spherical.computeDistanceBetween({ lat, lng }, nearestLocation).toFixed(2)
    : '246';

  if (errorMessageGeo === 'Loading...' || errorMessageCompass === 'Loading...') return <LoadingPage />;
  if (errorMessageGeo) return <ErrorPage message={errorMessageGeo} />;
  if (errorMessageCompass) return <ErrorPage message={errorMessageCompass} />;

  const setNearestLocation = (location) => {
    if (JSON.stringify(location) !== JSON.stringify(nearestLocation)) {
      setNearestLocation_(location);
      console.log('setNearestLocation:', location);
    }
  };

  return (
    <>
      <PinkBlob
        className="fixed"
        style={{
          zIndex: '-1',
          left: '-30vw',
          bottom: '0',
          width: '160vw',
          height: '40%',
        }}
      />
      <div className="fixed w-full h-3/4 -z-10" style={{ visibility: isMap ? 'visible' : 'hidden' }}>
        <Map
          center={{ lat, lng }}
          zoom={15}
          setNearestLocation={setNearestLocation}
          keyword={selectedKeyword}
          currentLocation={{ lat, lng }}
          openNow={true}
        >
          {nearestLocation && <Marker position={nearestLocation} />}
          {!errorMessageGeo && accuracy > 35 && (
            <MarkerCircle
              center={{ lat, lng }}
              radius={accuracy}
              fillColor="#4286f5"
              fillOpacity={0.2}
              strokeColor="#4286f5"
              strokeWeight={0.5}
            />
          )}
          {!errorMessageGeo && (
            <MarkerCircle
              center={{ lat, lng }}
              radius={30}
              fillColor="#0a51c2"
              fillOpacity={0.7}
              strokeColor="#fff"
              strokeWeight={1}
            />
          )}
        </Map>
      </div>
      <div className="h-full">
        <div className="w-full p-5 flex flex-col items-center gap-10 h-full">
          <div className="text-center flex flex-col gap-6">
            <h3>Compass to Happiness</h3>
            <button
              onClick={() => changeView('select')}
              className="rounded-2xl pt-3 pb-3 px-6 text-base font-semibold bg-primary-200"
            >
              <img src={backArrow} alt="Back arrow" className="w-4 inline mr-3"></img>
              Something Different
            </button>
          </div>
          <div className="h-1/2">
            <Compass angle={compassAngle} className="h-44 w-44" style={{ visibility: isMap ? 'hidden' : '' }} />
          </div>
          <div>
            <h2 className="font-bold text-5xl text-center mb-4">{distanceFromLocation}m Away</h2>
            <h3 className="font-bold text-base text-center">{nearestLocation ? nearestLocation.name : ''}</h3>
            <MapToggleButton onClick={() => setIsMap(!isMap)} isCurrentlyMap={isMap} />
          </div>
        </div>
      </div>
    </>
  );
}
