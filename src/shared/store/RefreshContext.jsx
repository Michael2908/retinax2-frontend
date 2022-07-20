import { createContext } from "react";

const RefreshContext = createContext({
  refreshTypeList: false,
  setRefreshTypeList: () => {},
});

export default RefreshContext;
