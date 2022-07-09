import { Wrapper as GoogleApiWrapper } from '@googlemaps/react-wrapper';
import { React, useState } from 'react';
import { CompassProvider } from './context/CompassContext';
import { GeoProvider } from './context/GeoContext';
import CompassPage from './pages/CompassPage';
import SelectionPage from './pages/SelectionPage';

function App() {
  const [currentComponent, changeView] = useState('select');
  const [selectedLocation, setSelectedLocation] = useState(null);

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
