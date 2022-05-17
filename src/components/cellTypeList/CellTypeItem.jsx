import React from "react";
import "./CellTypeItem.css";

const CellTypeItem = (props) => {
  const { cellType } = props;
  return (
    <li>
      <div className="cell-type-item-contents">
        Cell Type Name: {cellType.name} <br />
        Cell Id: {cellType.id}
        <br />
        Transform Type: {cellType.transformType}
        <br />
        Function: {cellType.function.expression}
        <br />
      </div>
    </li>
  );
};

export default CellTypeItem;
