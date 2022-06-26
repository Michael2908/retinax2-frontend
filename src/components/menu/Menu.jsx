import React, { useState } from "react";
import AddCellType from "./addCellType/AddCellType.jsx";
import CreateConnection from "./createConnection/CreateConnection.jsx";
import CreateSubGraph from "./createSubGraph/CreateSubGraph.jsx";
import "./Menu.css";

function Menu() {
  const [windowsStatus, setWindowsStatus] = useState([false, false, false]);

  const btnOnClickHandler = (event) => {
    const stateIndex = parseInt(event.currentTarget.name);
    if (windowsStatus[stateIndex]) {
      const newStatus = [false, false, false];
      setWindowsStatus(newStatus);
      return;
    }
    const newStatus = [false, false, false];
    newStatus[stateIndex] = true;
    setWindowsStatus(newStatus);
  };

  const closeWindow = () => setWindowsStatus([false, false, false]);

  const getPopupComponent = () => {
    const index = windowsStatus.findIndex((element) => element === true);
    console.log(index);
    switch (index) {
      case 0:
        return <AddCellType closeWindow={closeWindow} />;
      case 1:
        return <CreateConnection closeWindow={closeWindow} />;
      case 2:
        return <CreateSubGraph closeWindow={closeWindow} />;
      default:
        return <React.Fragment />;
    }
  };

  const popup = getPopupComponent();
  return (
    <React.Fragment>
      <div className="menu-bar">
        <h1 className="menu-title">Graph Manupulation</h1>
        <div className="btn-group">
          <button name="0" onClick={btnOnClickHandler}>
            Add Cell Type
          </button>
          <button name="1" onClick={btnOnClickHandler}>
            Connect Cells
          </button>
          <button name="2" onClick={btnOnClickHandler}>
            Create Subgraph
          </button>
          <button>Delete Cell</button>
          <button>Load Graph</button>
          <button>Save Graph</button>
        </div>
      </div>
      {popup}
    </React.Fragment>
  );
}

export default Menu;
