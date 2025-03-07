"use client";
import { getCookie } from "cookies-next";
import { createContext, useEffect, useReducer } from "react";
import { getApiCall } from "@/api/fatchData";

export const JonAndPersonContext = createContext();

const JonAndPersonReducer = (state, action) => {
  switch (action.type) {
    case "ADD_JOB_DATA":
      return { ...state, jobs: action.payload };
      case "ADD_EMPLOYEES_DATA":
        return { ...state, emplyees: action.payload };
    default:
      return state;
  }
};

export default function JonAndPersonContextProvider({ children }) {

  const [state, dispatch] = useReducer(JonAndPersonReducer, {
    jobs: null,
    emplyees: null,
  });


  return (
    <JonAndPersonContext.Provider value={{ state, dispatch }}>
      {children}
    </JonAndPersonContext.Provider>
  );
}
