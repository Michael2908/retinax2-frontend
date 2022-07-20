import React, { useEffect, useState } from "react";
import Menu from "./components/menu/Menu.jsx";
import NetworkGraph from "./components/networkGraph/NetworkGraph.jsx";
import CellTypeList from "./components/cellTypeList/CellTypeList.jsx";
import { getCellTypes, addCellType } from "./shared/services/CellService.jsx";
import useHttp from "./shared/hooks/useHttp.jsx";
import "./App.css";
import RefreshContext from "./shared/store/RefreshContext.jsx";

function App() {
  const { sendRequest, data, error, status } = useHttp(getCellTypes);
  const [refreshTypeList, setRefreshTypeList] = useState(false);
  const addCellTypeReq = useHttp(addCellType);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    if (!data) return;
    if (error) console.log("Got Error");
    console.log(status);
    if (status === "COMPLETED") {
      const inCells = [];
      const outCells = [];
      data.forEach((cell) =>
        cell.transformType === "INPUT_TO_ANALOG"
          ? inCells.push(cell)
          : outCells.push(cell)
      );

      console.log(inCells.length);

      if (inCells.length === 0) {
        console.log("No Input Cell... Creating New Type Inputs");
        const myCell = {
          name: "InputCell",
          transformType: "INPUT_TO_ANALOG",
          createFunctionRequest: {
            expression: "x",
            variables: ["x"],
          },
        };
        addCellTypeReq.sendRequest(myCell);
      } else return;
    }
    // eslint-disable-next-line
  }, [error, data, status]);

  return (
    <div className="app-container">
      <header>
        <h1 className="header-title">RetinaX_2</h1>
      </header>
      <aside className="aside">
        <RefreshContext.Provider
          value={{ refreshTypeList, setRefreshTypeList }}
        >
          <Menu />
          <CellTypeList />
        </RefreshContext.Provider>
      </aside>
      <section className="section">
        <NetworkGraph />
      </section>
    </div>
  );
}

export default App;
