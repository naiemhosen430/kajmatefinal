"use client"
import { useContext, useEffect, useState } from "react";
import { AuthContex } from "@/context/AuthContex";
import Link from "next/link";
import React from "react";
import { IoMdChatboxes, IoMdNotifications } from "react-icons/io";
import socket from "@/api/connectIo";
import { MessageContext } from "@/context/MessageContext";
import { toast } from "react-toastify"; // Importing toast from react-toastify
import { RiAccountCircleLine } from "react-icons/ri";


// Function to request notification permission from the user
const requestNotificationPermission = async () => {
  if ("Notification" in window) {
    try {
      const permission = await Notification.requestPermission();
      return permission;
    } catch (error) {
      console.error("Notification permission request failed", error);
    }
  }
  return "denied"; // Default if Notification API is not available
};

export default function Header() {
  const { state } = useContext(AuthContex);
  const user = state?.user;
  const { messageState, dispatch } = useContext(MessageContext);
  const [unreadMessages, setUnreadMessages] = useState(0); // Track unread messages count

  // Notification handler
  useEffect(() => {
    if (user?._id) {
      const messageHandler = (data) => {
        // Dispatch new message to the store
        dispatch({ type: "UPDATE_MESSAGE", payload: { data: data?.msgObj, _id: data?.msgid } });

        // Increase unread messages counter
        setUnreadMessages(prev => prev + 1);

        // Show toast notification
        toast(data?.name || "N/A" + ` ${data?.msgObj?.text}`, {
          position: "top-right",
          autoClose: 5000,
          type: "info",
        });

        // Display push notification if permission granted
        if (Notification.permission === "granted") {
          new Notification("New message", {
            body: data?.name || "N/A" + ` ${data?.msgObj?.test}`,
            icon: "/path-to-your-icon.png", 
          });
        }
      };

      // Listen for new messages
      socket.on("msg-" + user._id, messageHandler);

      // Clean up the socket listener on unmount
      return () => {
        socket.off("msg-" + user._id, messageHandler);
      };
    }
  }, [user?._id, dispatch]);

  useEffect(() => {
    // Request notification permission when the component mounts
    requestNotificationPermission();
  }, []);

  return (
    <div className="bg-black/50 p-2">
      <div className="container m-auto p-4 py-0 flex items-center justify-between">
        <div className="w-6/12 text-white text-[30px]">
          <Link href={"/"}>Kajmate</Link>
        </div>

        <div className="w-6/12 flex items-center py-2 justify-end">
          {user ? (
            <>
              <Link
                className="text-[15px] mx-2 px-5 py-2 relative rounded-xl text-white font-[600]"
                href={"/jobs"}
              >
            Job
              </Link>

              <Link
                className="text-[15px] mx-2 px-5 py-2 relative rounded-xl text-white font-[600]"
                href={"/employees"}
              >
            Employee
              </Link>

              <Link
                className="text-[15px] mx-2 px-5 py-2 relative bg-gray-500 rounded-xl text-white font-[600]"
                href={"/postajob"}
              >
            Post a job
              </Link>

              <Link
                className="text-[25px] mx-2 relative rounded-xl text-white font-[600]"
                href={"/notification"}
              >
                <IoMdNotifications />
                {unreadMessages > 0 && (
                  <span className="absolute top-[-10px] right-[-5px] p-1 rounded-full bg-gray-500 text-white text-[8px]">
                    {unreadMessages}
                  </span>
                )}
              </Link>

              <Link
                className="text-[25px] mx-2 relative rounded-xl text-white font-[600]"
                href={"/message"}
              >
                <IoMdChatboxes />
                {unreadMessages > 0 && (
                  <span className="absolute top-[-10px] right-[-5px] p-1 rounded-full bg-gray-500 text-white text-[8px]">
                    {unreadMessages}
                  </span>
                )}
              </Link>

              <Link
className="text-[25px] mx-2 relative rounded-xl text-white font-[600]"                href={"/register"}
              >
              <RiAccountCircleLine />
              </Link>
            </>
          ) : (
            <>
              <Link
                className="p-1 px-5 text-[15px] mr-2 border border-gray-500 rounded-xl text-white font-[600]"
                href={"/login"}
              >
                Login
              </Link>
              <Link
                className="p-1 px-5 text-[15px] border border-gray-500 rounded-xl text-white font-[600]"
                href={"/register"}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
