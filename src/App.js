import {React, useState} from "react";
import CompassPage from "./Pages/CompassPage";
import SelectionPage from "./Pages/SelectionPage";

function App() {
  const [currentComponent, changeView] = useState("select");

  function selectComponent() {
      switch(currentComponent) {
          case "select": return <SelectionPage />;
          case "compass": return <CompassPage />;

          default: return <div>No component found</div>;
      }
  }

  return (
      <div>
          { selectComponent() }
      </div>
  )
}

export default App;
