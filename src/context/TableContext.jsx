import { createContext, useReducer, useEffect } from "react";

const INITIAL_STATE = {
  tableData: JSON.parse(localStorage.getItem("tableData")) || null,
  loading: false,
  error: null,
};

export const TableContext = createContext(INITIAL_STATE);

const TableReducer = (state, action) => {
  // eslint-disable-next-line
  switch (action.type) {
    case "TABLE_DATA_EDIT_SUCCESS":
      return {
        tableData: action.payload,
        loading: false,
        error: null,
      };
    case "TABLE_DATA_DELETE_SUCCESS":
      return {
        tableData: action.payload,
        loading: false,
        error: null,
      };
    case "TABLE_DATA_FETCH_SUCCESS":
      return {
        tableData: action.payload,
        loading: false,
        error: null,
      };
  }
};

export const TableContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TableReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(state.tableData)); //setting up table data when state is updated
  }, [state.tableData]);

  return (
    <TableContext.Provider
      value={{
        tableData: state.tableData,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
