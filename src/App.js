import { React, useState } from 'react';
import { CompassProvider } from './context/CompassContext';
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
          <CompassProvider>
            <CompassPage changeView={changeView} selectedLocation={selectedLocation} />
          </CompassProvider>
        );

      default:
        return <div>No component found</div>;
    }
  }

  return selectComponent();
}

export default App;
