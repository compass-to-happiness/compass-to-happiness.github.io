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
        return (
          <GeoProvider>
            <CompassProvider>
              <CompassPage changeView={changeView} selectedLocation={selectedLocation} />
            </CompassProvider>
          </GeoProvider>
        );

      default:
        return <div>No component found</div>;
    }
  }

  return <div>{selectComponent()}</div>;
}

export default App;
