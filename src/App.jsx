import React from "react";
import Menu from "./components/menu/Menu.jsx";
import NetworkGraph from "./components/networkGraph/NetworkGraph.jsx";
import CellTypeList from "./components/cellTypeList/CellTypeList.jsx";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header>
        <h1 className="header-title">RetinaX 2</h1>
      </header>
      <aside className="aside">
        <Menu />
        <CellTypeList />
      </aside>
      <section className="section">
        <NetworkGraph />
      </section>
    </div>
  );
}

export default App;
