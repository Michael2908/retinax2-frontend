import { useState } from "react";
import useHttp from "../../../shared/hooks/useHttp.jsx";
import { addGraph } from "../../../shared/services/GraphService.jsx";
import "./CreateSubGraph.css";

const CreateSubGraph = (props) => {
  const [myGraph, setMyGraph] = useState({});
  const addGraphReq = useHttp(addGraph);

  const stateHandler = (str, val) => {
    setMyGraph((prevState) => {
      return {
        ...prevState,
        [str]: val,
      };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    addGraphReq.sendRequest(myGraph);
  };

  return props.trigger ? (
    <form onSubmit={submitHandler}>
      <div className="main-popup">
        <div className="popup-inner">
          <div className="container">
            <label>Create New Sub Graph</label>
            <label>Sub Graph Name:</label>
            <input
              type="text"
              value={myGraph.name}
              onChange={(e) => {
                stateHandler("name", e.target.value);
              }}
              placeholder="Alpha"
            />
            <label>Cell Instance Id:</label>
            <input
              type="text"
              value={myGraph.id}
              onChange={(e) => {
                stateHandler("cellInstanceID", e.target.value);
              }}
              placeholder="1"
            />
            <br />
            <br />
            <div className="accept">
              <button type="submit">Create Sub Graph</button>
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

export default CreateSubGraph;
