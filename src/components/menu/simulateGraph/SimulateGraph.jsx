import React, { useState } from "react";
import { useEffect } from "react";
import useHttp from "../../../shared/hooks/useHttp.jsx";
import {
  addCellType,
  getCellInstances,
} from "../../../shared/services/CellService.jsx";
import SimulateCellItem from "./SimulateCellItem.jsx";
import "./SimulateGraph.css";

const AddCell = (props) => {
  const [myCell, setMyCell] = useState({ createFunctionRequest: {} });
  const [cells, setCells] = useState({ inCells: [], outCells: [] });
  const addCellTypeReq = useHttp(addCellType);
  const { sendRequest, data } = useHttp(getCellInstances);
  const { closeWindow } = props;
  console.log(cells);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    if (!data) return;
    console.log(data[0]);
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
    if (addCellTypeReq.status !== "COMPLETED" || addCellTypeReq.error) return;
    closeWindow();
  }, [addCellTypeReq.status, addCellTypeReq.error, closeWindow]);

  const stateHandler = (str, val) => {
    setMyCell((prevState) => {
      return {
        ...prevState,
        [str]: val,
      };
    });
  };

  const stateFunctionHandler = (str, val) => {
    setMyCell((prevState) => {
      return {
        ...prevState,
        createFunctionRequest: {
          ...prevState.createFunctionRequest,
          [str]: val,
        },
      };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    addCellTypeReq.sendRequest(myCell);
    setMyCell({ createFunctionRequest: {} });
  };

  return (
    <form className="main-popup" onSubmit={submitHandler}>
      <div className="popup-inner">
        <div className="container">
          <label>Start Simulation</label>
          {cells.inCells.map((cell) => (
            <SimulateCellItem cell={cell} key={cell.id} />
          ))}
        </div>
      </div>
    </form>
  );
};

export default AddCell;
