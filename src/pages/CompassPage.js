import Compass from '../components/Compass';
import Map from '../components/Map';
import backArrow from '../images/back-arrow.png';
import { useState } from 'react';
import { ReactComponent as PinkBlob } from '../images/pink-blob-rotated.svg';
import MapToggleButton from '../components/MapToggleButton';
import { useGeo } from '../context/GeoContext';

export default function CompassPage({ changeView, selectedKeyword }) {
  const [isMap, setIsMap] = useState(false);
  const [nearestLocation, setNearestLocation_] = useState(null);
  const { lat, lng, errorMessage } = useGeo();

export default function CompassPage({ changeView }) {
  const [isMap, setIsMap] = useState(false);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

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
        />
      </div>
      <div className="h-full">
        <Wrapper apiKey={process.env.REACT_APP_API_KEY} render={(status) => render(status)}>
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
              <Compass angle="50" className="h-44 w-44" style={{ visibility: isMap ? 'hidden' : '' }} />
            </div>
            <div>
              <h2 className="font-bold text-5xl text-center mb-4">246m Away</h2>
              <h3 className="font-bold text-base text-center">Gelatiamo</h3>
              <MapToggleButton onClick={() => setIsMap(!isMap)} isCurrentlyMap={isMap} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
