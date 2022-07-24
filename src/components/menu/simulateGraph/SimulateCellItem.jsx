import React from "react";

const SimulateCellItem = (props) => {
  const { index, cell, updateCell } = props;

  const inputChangeHandler = (event) =>
    updateCell(index, {
      ...cell,
      userInput: event.target.value.split(","),
    });

  return (
    <>
      <label>Cell Id: {cell.id}</label>
      <input
        onChange={inputChangeHandler}
        placeholder="Enter Data or Leave Empty"
      />
    </>
  );
};

export default SimulateCellItem;
