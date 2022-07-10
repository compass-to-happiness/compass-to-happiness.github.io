import { useState } from 'react';
import greenBlob from '../images/green-blob.svg';
import pinkBlob from '../images/pink-blob.svg';
import ErrorPage from './ErrorPage';

/**
 * Request permission for DeviceOrientationEvents, required for iOS 13+.
 */
export default function IOSPage({ changeView }) {
  const [result, setResult] = useState(null);

  if (result === 'granted') {
    localStorage.setItem('DeviceOrientationEvent.requestPermission()', 'granted');
    changeView('select');
  } else if (result === 'denied') {
    const message =
      'Permission to access device orientation was denied, please completely exit your browser and reload this page to try again.';
    return <ErrorPage message={<div className="p-8 text-center">{message}</div>} />;
  }

  const onClick = async () => {
    setResult(await DeviceOrientationEvent.requestPermission());
  };

  return (
    <>
      <div className="h-full flex items-center justify-center p-8 text-center" onClick={onClick}>
        iOS 13+ requires user interaction before we can ask for access to your compass.
        <br />
        <br />
        Please tap anywhere to continue :)
      </div>
      <img
        src={greenBlob}
        className="fixed -z-10 max-w-md"
        style={{ top: '-150px', right: '-150px', transform: 'rotate(150deg)' }}
        alt="Green Blob"
      />
      <img
        src={pinkBlob}
        className="fixed -z-10 max-w-xl"
        style={{ bottom: '-350px', left: '-200px', transform: 'rotate(168deg)' }}
        alt="Green Blob"
      />
    </>
  );
}
