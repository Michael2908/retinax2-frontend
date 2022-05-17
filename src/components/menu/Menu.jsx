import React, { useState } from "react";
import { addCellInstance } from "../../shared/services/CellService.jsx";
import AddcellInstance from "./addCellInstance/AddCellInstance.jsx";
import AddCellType from "./addCellType/AddCellType.jsx";
import CreateConnection from "./createConnection/CreateConnection.jsx";
import CreateSubGraph from "./createSubGraph/CreateSubGraph.jsx";
import "./Menu.css";
import PopupItem from "./popupItem/PopupItem.jsx";

function Menu() {
  const [windowsStatus, setWindowsStatus] = useState([
    false,
    false,
    false,
    false,
  ]);

  const btnOnClickHandler = (event) => {
    const stateIndex = parseInt(event.currentTarget.name);
    if (windowsStatus[stateIndex]) {
      const newStatus = [false, false, false, false];
      setWindowsStatus(newStatus);
      return;
    }
    const newStatus = [false, false, false, false];
    newStatus[stateIndex] = true;
    setWindowsStatus(newStatus);
  };

  const closeWindow = () => {
    setWindowsStatus([false, false, false, false]);
  };

  const getPopupComponent = () => {
    // defaultValue,
    // sendRequest,
    // closeWindow,
    // title,
    // submitTitle,
    // controls,
    const index = windowsStatus.findIndex((element) => element === true);
    // <label>{control.label}</label>
    // <input
    //   type={control.input.type}
    //   value={itemState[control.input.name]}
    //   name={control.input.name}
    //   onChange={stateHandler}
    //   placeholder={control.input.placeholder}
    console.log(index);
    if (index < 0) return <React.Fragment />;
    // if (index === 0) {
    //   return <PopupItem />;
    // }
    if (index === 1) {
      const controls = [
        {
          label: "Cell Type Id:",
          input: { name: "cellTypeId", placeholder: "Example: 27" },
        },
      ];
      return (
        <PopupItem
          sendRequest={addCellInstance}
          closeWindow={closeWindow}
          title="Creating New Cell Instance"
          submitTitle="Create Cell"
          controls={controls}
        />
      );
    }
    // if (index === 2) {
    //   return <PopupItem />;
    // }
    // if (index === 3) {
    //   return <PopupItem />;
    // }
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
            Add Cell
          </button>
          <button name="2" onClick={btnOnClickHandler}>
            Connect Cells
          </button>
          <button name="3" onClick={btnOnClickHandler}>
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
