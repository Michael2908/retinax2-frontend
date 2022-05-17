import { AddData, GetData } from "./WebService.jsx";

export const getCellTypes = () => GetData("cellTypes");
export const addCellType = (myCell) => AddData(myCell, "createCellType");
export const addCellInstance = (myCell) =>
  AddData({ ...myCell, x: 3.6, y: 2.7 }, "addCell");
export const addConnection = (myCell) => AddData(myCell, "connect");
