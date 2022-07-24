import { useState, useEffect } from "react";
import useHttp from "../../../shared/hooks/useHttp.jsx";
import { downloadGraph } from "../../../shared/services/GraphService.jsx";

const DownloadSubgraph = (props) => {
  const [myGraph, setMyGraph] = useState({});
  const getGraphReq = useHttp(downloadGraph);
  const { closeWindow } = props;

  useEffect(() => {
    if (getGraphReq.status !== "COMPLETED" || getGraphReq.error) return;
  }, [getGraphReq.status, getGraphReq.error]);

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
    getGraphReq.sendRequest(myGraph.graphId);
    const blob = new Blob([JSON.stringify(getGraphReq.data, 1, 3)], {
      type: "text/json",
    });
    const a = document.createElement("a");
    a.download = "Graph.json";
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
    closeWindow();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="main-popup">
        <div className="popup-inner">
          <div className="container">
            <label>Download Graph</label>
            <label>Graph Id:</label>
            <input
              type="text"
              disabled={getGraphReq.status === "PENDING"}
              value={myGraph.id}
              onChange={(e) => {
                stateHandler("graphId", e.target.value);
              }}
              placeholder="Enter Subgraph Id"
            />
            <br></br>
            <div className="accept">
              <button disabled={getGraphReq.status === "PENDING"} type="submit">
                {getGraphReq.status === "PENDING"
                  ? "This May Take A Few Minutes..."
                  : "Download"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DownloadSubgraph;
