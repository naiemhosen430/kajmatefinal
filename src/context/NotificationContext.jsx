"use client";
import { getCookie } from "cookies-next";
import { createContext, useEffect, useReducer } from "react";
import { getApiCall } from "@/api/fatchData";

export const NotificationContext = createContext();

const notificationReducer = (notificationsState, action) => {
  switch (action.type) {
    case "ADD_NEW_NOTIFICATION":
      return { ...notificationsState, notifications: notificationsState.notifications?.length ? [...notificationsState.notifications, action.payload] : [] };
    case "ADD_NOTIFICATIONS":
      return { ...notificationsState, notifications: action.payload?.length ? action.payload : [] };
    default:

      return notificationsState;
  }
};

export default function NotificationContextProvider({ children }) {
  const token = getCookie("accesstoken");

  const [notificationsState, dispatch] = useReducer(notificationReducer, {
    notifications: null,
  });

  useEffect(() => {
    if (token && !notificationsState?.notifications) {
      const fetchData = async () => {
        try {
          const response = await getApiCall("notification/getallnotification");
          if (response?.statusCode === 200 && response?.data) {
            dispatch({ type: "ADD_NOTIFICATIONS", payload: response?.data });
          }
        } catch (error) {}
      };

      fetchData();
    }
  }, [token, notificationsState]);

  return (
    <NotificationContext.Provider value={{ notificationsState, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
}
