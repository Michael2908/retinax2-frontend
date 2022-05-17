import react, { useState } from "react";
import "./DeleteCell.css";

const DeleteCell = (props) => {
  //   const [DeleteCellId, setCellType] = useState("");

  //   const DeleteCellTypeHandler = (event) => {
  //     setCellType(event.target.value);
  //   };

  return props.trigger ? (
    <form>
      <label>CellType:</label>
      <input type="text" />
      <br />
      <br />
      <div className="accept">
        <button type="submit">Create Cell Type</button>
      </div>
    </form>
  ) : (
    ""
  );
};

export default DeleteCell;
