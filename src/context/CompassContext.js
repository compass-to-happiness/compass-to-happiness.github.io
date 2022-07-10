import { createContext, useContext, useEffect, useRef, useState } from 'react';

const AVG_N_BEARINGS = 3;

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
      return 'Compass permission was denied by the user.';
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
    setBearing(360 - ev.alpha);
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
  const bearings = useRef([]);
  const [avgBearing, setAvgBearing] = useState(-1);
  const [errorMessage, setErrorMessage] = useState('Loading...');

  useEffect(() => {
    startCompassListening({
      setBearing: (newBearing) => {
        if (bearings.current.length > 0 && bearings.current.at(-1) === newBearing) {
          // Ignore duplicate bearings.
          return;
        }

        if (bearings.current.length > AVG_N_BEARINGS) {
          bearings.current.shift();
        }
        bearings.current.push(newBearing);

        setAvgBearing(bearings.current.reduce((a, b) => a + b) / bearings.current.length);
      },
    }).then((error) => {
      setErrorMessage(error);
    });
  }, []);

  return <CompassContext.Provider value={{ bearing: avgBearing, errorMessage }} children={children} />;
};
