import graphImade from "../../images/pngwing.png";
import "./NetworkGraph.css";

function NetworkGraph() {
  return (
    <div className="main">
      {/* <img src={graphImade} alt="" /> */}
      <iframe
        title="i"
        src="http://localhost:7474/browser/"
        frameBorder="0"
      ></iframe>
    </div>
  );
}

export default NetworkGraph;
