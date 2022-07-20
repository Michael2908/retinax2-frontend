import React, { useState, useRef, useEffect } from "react";
import useHttp from "../../../shared/hooks/useHttp.jsx";
import { getCellInstances } from "../../../shared/services/CellService.jsx";
import { simulateGraph } from "../../../shared/services/GraphService.jsx";
import SimulateCellItem from "./SimulateCellItem.jsx";

const SimulateGraph = (props) => {
  const { closeWindow } = props;
  const [cells, setCells] = useState({ inCells: [], outCells: [] });
  const [simResults, setSimResults] = useState();
  const { sendRequest, data } = useHttp(getCellInstances);
  const { sendRequest: sendSimRequest, data: simData } = useHttp(simulateGraph);
  const inputRef = useRef();

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    if (!data) return;
    const inCells = [];
    const outCells = [];
    data.forEach((cell) =>
      cell.cellType.transformType === "INPUT_TO_ANALOG"
        ? inCells.push(cell)
        : outCells.push(cell)
    );
    setCells({ inCells, outCells });
  }, [data]);

  useEffect(() => {
    if (simData?.cellsResults) {
      setSimResults(simData.cellsResults);
    }
  }, [simData]);

  const updateCell = (index, newCell) => {
    const newCells = [...cells.inCells];
    newCells[index] = newCell;
    setCells((prevState) => ({ ...prevState, inCells: newCells }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const mySim = { userInput: {}, maxTime: "", outputCells: [] };
    const outputCells = inputRef.current.value.split(",");
    mySim.maxTime = cells.inCells[0].userInput.length;
    const mySimGraph = [];
    for (const cell of cells.inCells) {
      if (cell.userInput.length !== mySim.maxTime) {
        alert("All Input Variables Have To Be The Same Length ");
        return;
      }
      mySim.userInput[cell.id] = cell.userInput;
      mySimGraph.push(cell.cellType.id);
    }
    for (const outputCell of outputCells)
      mySim.outputCells.push({ id: outputCell });

    sendSimRequest(mySim);
  };

  if (simResults)
    return (
      <>
        <form
          className="main-popup"
          onSubmit={(e) => {
            e.preventDefault();
            closeWindow();
          }}
        >
          <div className="popup-inner">
            <div className="container">
              <label>Simulation Results</label>
              <ul>
                {Object.keys(simResults).map((key) => {
                  const values = simResults[key]
                    .map((result) => result.value)
                    .join(",");
                  return (
                    <li className="sim-results">
                      Cell Id:&nbsp;{key}&nbsp; Values: &nbsp; {values}
                    </li>
                  );
                })}
              </ul>
              <div className="accept">
                <button type="submit">Ok</button>
              </div>
            </div>
          </div>
        </form>
      </>
    );

  return (
    <form className="main-popup" onSubmit={submitHandler}>
      <div className="popup-inner">
        <div className="container">
          <label>Start Simulation</label>
          {cells.inCells.map((cell, index) => (
            <SimulateCellItem
              cell={cell}
              index={index}
              key={cell.id}
              updateCell={updateCell}
            />
          ))}
          <br></br>
          <label>Cell Output Ids:</label>
          <input
            ref={inputRef}
            placeholder="input Cell ids to show calculation"
          />
          <br></br>
          <div className="accept">
            <button type="submit">Simulate</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SimulateGraph;
