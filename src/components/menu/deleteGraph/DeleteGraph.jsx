import { useState, useEffect } from "react";
import useHttp from "../../../shared/hooks/useHttp.jsx";
import { deleteGraph } from "../../../shared/services/GraphService.jsx";

const DeleteCell = (props) => {
  const [myGraph, setMyGraph] = useState({});
  const deleteGraphReq = useHttp(deleteGraph);
  const { closeWindow } = props;

  useEffect(() => {
    if (deleteGraphReq.status !== "COMPLETED" || deleteGraphReq.error) return;
    closeWindow();
  }, [deleteGraphReq.status, deleteGraphReq.error, closeWindow]);

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
    console.log("test");
    deleteGraphReq.sendRequest(myGraph.graphId);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="main-popup">
        <div className="popup-inner">
          <div className="container">
            <label>Delete Graph</label>
            <label>Graph Id:</label>
            <input
              type="text"
              disabled={deleteGraphReq.status === "PENDING"}
              value={myGraph.id}
              onChange={(e) => {
                stateHandler("graphId", e.target.value);
              }}
              placeholder="1"
            />
            <br></br>
            <div className="accept">
              <button
                disabled={deleteGraphReq.status === "PENDING"}
                type="submit"
              >
                {deleteGraphReq.status === "PENDING"
                  ? "This May Take Few Minutes..."
                  : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DeleteCell;
