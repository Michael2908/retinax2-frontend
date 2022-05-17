import { useState } from "react";
import useHttp from "../../../shared/hooks/useHttp.jsx";
import { addCellInstance } from "../../../shared/services/CellService.jsx";
import "./AddCellInstance.css";

const AddCell = (props) => {
  const [myCell, setMyCell] = useState({});
  const addCellInstanceReq = useHttp(addCellInstance);

  const stateHandler = (str, val) => {
    setMyCell((prevState) => {
      return {
        ...prevState,
        [str]: parseInt(val),
        x: 3.6,
        y: 2.7,
      };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    addCellInstanceReq.sendRequest(myCell);
  };

  return props.trigger ? (
    <form onSubmit={submitHandler}>
      <div className="main-popup">
        <div className="popup-inner">
          <div className="container">
            <label>Creating New Cell Instance</label>
            <label>Cell Type Id:</label>
            <input
              type="text"
              value={myCell.name}
              onChange={(e) => {
                stateHandler("cellTypeId", e.target.value);
              }}
              placeholder="Example: 27"
            />
            <div className="accept">
              <button type="submit">Create Cell</button>
            </div>
          </div>
          {props.childern}
        </div>
      </div>
    </form>
  ) : (
    ""
  );
};

export default AddCell;
