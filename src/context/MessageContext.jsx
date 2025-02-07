"use client";
import { getCookie } from "cookies-next";
import { createContext, useEffect, useReducer } from "react";
import { getApiCall } from "@/api/fatchData";

export const MessageContext = createContext();

const messageReducer = (messageState, action) => {
  switch (action.type) {
    case "ADD_NEW_MESSAGE":
      return { ...messageState, messages: messageState.messages?.length ? [...messageState.messages, action.payload] : [] };
    case "ADD_MESSAGES":
      return { ...messageState, messages: action.payload?.length ? action.payload : [] };
    case "UPDATE_MESSAGE":
      const updatedMessages = messageState.messages?.map((message) => {
        if (message._id === action.payload?._id) {
          return action.payload?.data || message; 
        }
        return message;
      });

 
      
      return updatedMessages
    default:

      return messageState;
  }
};

export default function MessageContextProvider({ children }) {
  const token = getCookie("accesstoken");

  const [messageState, dispatch] = useReducer(messageReducer, {
    messages: null,
  });

  const fetchDataMesages = async () => {
    try {
      const response = await getApiCall("message/getallmessage");
      if (response?.statusCode === 200 && response?.data) {
        dispatch({ type: "ADD_MESSAGES", payload: response?.data });
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (token && !messageState?.messages) {

      fetchDataMesages();
    }
  }, [token, messageState]);

  return (
    <MessageContext.Provider value={{ messageState, dispatch,fetchDataMesages }}>
      {children}
    </MessageContext.Provider>
  );
}
