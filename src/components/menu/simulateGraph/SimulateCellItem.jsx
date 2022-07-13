import React from "react";
import "./SimulateGraph.css";

const SimulateCellItem = (props) => {
  const { cell } = props;

  return (
    <>
      <label>Cell Id: {cell.id}</label>
      <input />
    </>
  );
};

export default SimulateCellItem;
