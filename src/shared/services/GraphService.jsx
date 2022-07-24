import { AddData, DeleteData, GetData } from "./WebService.jsx";

export const addGraph = (myGraph) => AddData(myGraph, "build/createSubGraph");
export const cloneGraph = (val) =>
  AddData(undefined, "build/cloneSubGraph/" + val);
export const deleteGraph = (val) => DeleteData("build/subGraphId/" + val);
export const downloadGraph = (val) => GetData("build/getSubGraphById/" + val);
export const simulateGraph = (val) => AddData(val, "simulate");
