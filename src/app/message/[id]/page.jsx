"use client"
import socket from '@/api/connectIo';
import { getApiCall, postApiCall } from '@/api/fatchData';
import { AuthContex } from '@/context/AuthContex';
import { MessageContext } from '@/context/MessageContext';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState, useRef } from 'react';

export default function Page() {
  const { state } = useContext(AuthContex);
  const { messageState } = useContext(MessageContext);
  const messages = messageState?.messages;
  const user = state?.user;
  let { id } = useParams();
  const [message_data, set_message_data] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);  // Ref for scrolling to the bottom of the message list

  // Effect to set the message data based on ID
  useEffect(() => {
    if (id && messages) {
      const finded_data = messages?.find((s_message) => s_message?._id === id);
      set_message_data(finded_data);
    }
  }, [messageState, id]);

  // Effect to scroll to the bottom whenever the message data changes
  useEffect(() => {
    // Scroll to the bottom of the messages area when new messages are added
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [message_data?.chats]); // Trigger when chats change

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      socket.emit("messagesent", {
        mstContent: newMessage, 
        ownerId: user?._id,
        receiverId: message_data?.profile?._id, 
        sendtime: Date.now(),
        status: "unseen",
        msgid: id
      });
      setNewMessage(""); // Clear input field
    }
  };

  if (!message_data) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <div className="w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="lg:rounded-r-[20px] container m-auto rounded-t-[20px] w-full lg:h-screen h-[90vh] overflow-hidden overflow-y-auto bg-[#023020]">
      {/* Conversation Header */}
      <div className="flex justify-between items-center bg-[#1c3d2b] p-2 rounded-t-[20px] text-white">
        <div>
          <h3 className="text-[20px] font-semibold">{message_data?.profile?.fullname}</h3>
          <span className="text-[12px]">{message_data?.profile?.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-300">{message_data?.profile?.online_status ? "online" : "offline"}</span>
        </div>
      </div>

      {/* Messages Display Area */}
      <div className="messages-area space-y-4 overflow-y-auto max-h-[70vh] mt-4 mb-6">
        {message_data?.chats?.map((chat, index) => (
          <div key={index} className={`flex ${chat.owner_id === user?._id ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs p-3 rounded-lg ${chat.owner_id === user?._id ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'}`}>
              <p>{chat.text}</p>
            </div>
          </div>
        ))}
        {/* Scroll to Bottom Marker */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="flex fixed left-0 bottom-0 w-full items-center p-4 bg-[#023020]">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-3 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
}
