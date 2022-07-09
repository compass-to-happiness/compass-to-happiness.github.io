import { createContext, useContext, useEffect, useState } from 'react';

/***
 * Start listening for compass events.
 *
 * @param setBearing Accepts a single parameter in the range 0.0-360.0, called when a new bearing is available.
 * @returns Error message if compass failed to start, or null.
 */
async function startCompassListening({ setBearing }) {
  if (!window.DeviceOrientationEvent) {
    return 'DeviceOrientationEvent is not supported in this browser.';
  }

  if (window.ondeviceorientation === undefined && window.ondeviceorientationabsolute === undefined) {
    return 'Device orientation events might not be supported in this browser.';
  }

  // Request permission if necessary (iOS 13+)
  if (DeviceOrientationEvent.requestPermission) {
    const response = await DeviceOrientationEvent.requestPermission();
    if (response !== 'granted') {
      return 'Permission was denied by the user.';
    }
  }

  // Promise resolves the error message if compass failed to start, or null.
  let returnError;
  const promise = new Promise((resolve) => {
    returnError = resolve;
  });
  setTimeout(() => {
    returnError('Failed to start compass after one second.');
  }, 1000);

  const handler = (ev) => {
    // iOS, see https://developer.apple.com/documentation/webkitjs/deviceorientationevent/1804777-webkitcompassheading.
    if (ev.webkitCompassHeading != null) {
      // Successfully recieved orientation data.
      returnError(null);

      // Report the received bearing.
      setBearing(-ev.webkitCompassHeading);
      return;
    }

    // Check that bearing exists.
    if (ev.alpha == null) {
      returnError('Compass heading not found in event.');
      return;
    }

    // Check that bearing is absolute.
    if (!ev.absolute) {
      returnError('Compass results are relative to the device.');
      return;
    }

    // Successfully recieved orientation data.
    returnError(null);

    // Report the received bearing.
    setBearing(-Math.abs(ev.alpha - 360));
  };

  // Add event listeners, prefer absolute orientation events.
  if (window.ondeviceorientationabsolute !== undefined) {
    window.addEventListener('deviceorientationabsolute', handler, true);
  } else {
    window.addEventListener('deviceorientation', handler, true);
  }

  return promise;
}

const CompassContext = createContext({
  bearing: -1,
  errorMessage: 'Loading...',
});

export const useCompass = () => useContext(CompassContext);

export const CompassProvider = ({ children }) => {
  const [bearing, setBearing] = useState(-1);
  const [errorMessage, setErrorMessage] = useState('Loading...');

  useEffect(() => {
    startCompassListening({ setBearing }).then((error) => {
      setErrorMessage(error);
    });
  }, []);

  return <CompassContext.Provider value={{ bearing, errorMessage }} children={children} />;
};
