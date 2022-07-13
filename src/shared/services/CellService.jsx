import { AddData, GetData, DeleteData } from "./WebService.jsx";

export const getCellTypes = () => GetData("cellTypes");
export const getCellInstances = () => GetData("cellInstances/");
export const addCellType = (myCell) => AddData(myCell, "createCellType");
export const addCellInstance = (cellTypeId) =>
  AddData({ cellTypeId, x: 3.6, y: 2.7 }, "addCell");
export const addConnection = (myCell) => AddData(myCell, "connect");
export const deleteCellInstance = (myCell) =>
  DeleteData("cellInstances/" + myCell);
