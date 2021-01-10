import React, { useReducer, useContext, createContext } from "react";
import reducer, { initialState } from "./reducer";

const StateContext = createContext();

const DataLayer = ({ children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);

export default DataLayer;
