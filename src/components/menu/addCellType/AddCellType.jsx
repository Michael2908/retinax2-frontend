import React, { useState, useContext, useEffect } from "react";
import useHttp from "../../../shared/hooks/useHttp.jsx";
import { addCellType } from "../../../shared/services/CellService.jsx";
import RefreshContext from "../../../shared/store/RefreshContext.jsx";

const AddCell = (props) => {
  const [myCell, setMyCell] = useState({ createFunctionRequest: {} });
  const { setRefreshTypeList } = useContext(RefreshContext);
  const addCellTypeReq = useHttp(addCellType);
  const { closeWindow } = props;

  useEffect(() => {
    if (addCellTypeReq.status !== "COMPLETED") return;
    if (addCellTypeReq.error) {
      alert("Input Error!");
      return;
    }
    setRefreshTypeList(true);
    closeWindow();
  }, [
    addCellTypeReq.status,
    addCellTypeReq.error,
    closeWindow,
    setRefreshTypeList,
  ]);

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
          <label>Creating New Cell Type</label>
          <label>Cell Type:</label>
          <input
            type="text"
            value={myCell.name}
            onChange={(e) => {
              stateHandler("name", e.target.value);
            }}
            placeholder="Enter Cell Type Name"
          />
          <label>Function Expression:</label>
          <input
            type="text"
            value={myCell.createFunctionRequest.expression}
            onChange={(e) => {
              stateFunctionHandler("expression", e.target.value);
            }}
            placeholder="Enter Expression, example: x + y + z"
          />
          <label>Variables:</label>
          <input
            type="text"
            value={myCell.createFunctionRequest.variables}
            onChange={(e) => {
              const variables = e.target.value.replace(/\s/g, "").split(",");
              stateFunctionHandler("variables", variables);
            }}
            placeholder="Enter Expression variable, example: x, y, z"
          />
          <label>Transform Type:</label>
          <div className="row">
            <button
              type="button"
              className={
                myCell.transformType === "ANALOG_TO_ANALOG" ? "btn-active" : ""
              }
              onClick={() => {
                stateHandler("transformType", "ANALOG_TO_ANALOG");
              }}
            >
              Analog to Analog
            </button>
            <button
              type="button"
              className={
                myCell.transformType === "ANALOG_TO_DIGITAL" ? "btn-active" : ""
              }
              onClick={() => {
                stateHandler("transformType", "ANALOG_TO_DIGITAL");
              }}
            >
              Analog to Digital
            </button>
            <button
              type="button"
              className={
                myCell.transformType === "DIGITAL_TO_ANALOG" ? "btn-active" : ""
              }
              onClick={() => {
                stateHandler("transformType", "DIGITAL_TO_ANALOG");
              }}
            >
              Digital to Analog
            </button>
            <button
              type="button"
              className={
                myCell.transformType === "DIGITAL_TO_DIGITAL"
                  ? "btn-active"
                  : ""
              }
              onClick={() => {
                stateHandler("transformType", "DIGITAL_TO_DIGITAL");
              }}
            >
              Digital to Digital
            </button>
            <button
              type="button"
              className={
                myCell.transformType === "INPUT_TO_ANALOG" ? "btn-active" : ""
              }
              onClick={() => {
                stateHandler("transformType", "INPUT_TO_ANALOG");
              }}
            >
              Input to Analog
            </button>
          </div>
          <br />
          <br />
          <div className="accept">
            <button type="submit">Create Cell Type</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddCell;
