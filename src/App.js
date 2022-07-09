import { React, useState } from "react";
import CompassPage from "./pages/CompassPage";
import SelectionPage from "./pages/SelectionPage";

function App() {
  const [currentComponent, changeView] = useState("select");

  function selectComponent() {
    switch (currentComponent) {
      case "select":
        return <SelectionPage changeView={changeView} />;
      case "compass":
        return <CompassPage changeView={changeView} />;

      default:
        return <div>No component found</div>;
    }
  }

  return <div>{selectComponent()}</div>;
}

export default App;
