import { AddData, CloneData } from "./WebService.jsx";

export const addGraph = (myGraph) => AddData(myGraph, "createSubGraph");
export const cloneGraph = (val) => CloneData("cloneSubGraph/" + val);
