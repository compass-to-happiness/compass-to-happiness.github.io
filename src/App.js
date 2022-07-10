import { Wrapper as GoogleApiWrapper } from '@googlemaps/react-wrapper';
import { React, useState } from 'react';
import { CompassProvider } from './context/CompassContext';
import { GeoProvider } from './context/GeoContext';
import CompassPage from './pages/CompassPage';
import IOSPage from './pages/IOSPage';
import SelectionPage from './pages/SelectionPage';

function App() {
  const startPage = window.DeviceOrientationEvent?.requestPermission ? 'ios' : 'select';
  const [currentComponent, changeView] = useState(startPage);
  const [selectedLocation, setSelectedLocation] = useState(null);

  if (currentComponent === 'ios') {
    return <IOSPage changeView={changeView} />;
  }

  function selectComponent() {
    switch (currentComponent) {
      case 'select':
        return <SelectionPage changeView={changeView} setSelectedLocation={setSelectedLocation} />;
      case 'compass':
        return <CompassPage changeView={changeView} selectedKeyword={selectedLocation} />;

      default:
        return <div>No component found</div>;
    }
  }

  return (
    <GoogleApiWrapper apiKey={process.env.REACT_APP_API_KEY} libraries={['places', 'geometry']}>
      <GeoProvider>
        <CompassProvider>{selectComponent()}</CompassProvider>
      </GeoProvider>
    </GoogleApiWrapper>
  );
}

export default App;
