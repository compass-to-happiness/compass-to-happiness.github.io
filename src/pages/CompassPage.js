import { Wrapper, Status } from '@googlemaps/react-wrapper';
import Spinner from '../components/Spinner';
import Error from '../components/Error';
import Compass from '../components/Compass';
import Map from '../components/Map';
import backArrow from '../images/back-arrow.png';
import { useState } from 'react';
import { ReactComponent as PinkBlobSVG } from '../images/pink-blob.svg';
import MapToggleButton from '../components/MapToggleButton';

const render = (status) => {
  if (status === Status.FAILURE) return <Error />;
  return <Spinner />;
};

export default function CompassPage({ changeView }) {
  const [isMap, setIsMap] = useState('false');

  return (
    <>
      <PinkBlobSVG
        className="fixed"
        style={{
          zIndex: '-1',
          bottom: '-70vw',
          left: 'clamp(-100px, -10vw, 0px)',
          transform: 'rotate(-80deg)',
          height: '160vw',
        }}
      />
      <div className="h-full">
        <Wrapper apiKey={process.env.REACT_APP_API_KEY} render={(status) => render(status)}>
          <div className="w-full p-5 flex flex-col items-center gap-10 h-full">
            <div>
              <h3 className="font-bold text-base text-center mb-6 font-s">Compass to Happiness</h3>
              <button
                onClick={() => changeView('select')}
                className="rounded-2xl pt-3 pb-3 px-6 text-base font-semibold bg-primary-200"
              >
                <img src={backArrow} alt="Back arrow" className="w-4 inline mr-3"></img>
                Something Different
              </button>
            </div>
            <div className="h-1/2">
              {isMap ? (
                <Map center={{ lat: -36.842, lng: 174.757 }} zoom={15} />
              ) : (
                <Compass angle="50" className="w-44 h-44" />
              )}
            </div>
            <div>
              <h2 className="font-bold text-5xl text-center mb-4">246m Away</h2>
              <h3 className="font-bold text-base text-center">Gelatiamo</h3>
              <MapToggleButton onClick={() => setIsMap(!isMap)} isCurrentlyMap={isMap} />
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
}
