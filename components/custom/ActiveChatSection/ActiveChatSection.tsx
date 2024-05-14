"use client";

// import modules

// import files
import "./ActiveChatSection.scss";
import ActiveChatHeader from "./ActiveChatHeader/ActiveChatHeader";
import ChatInput from "./ChatInput/ChatInput";

const ActiveChat = () => {
  return (
    <div className="active-chat-section-container">
      <ActiveChatHeader />

      <div className="active-chat-section-messages"></div>

      <ChatInput />
    </div>
  );
};

export default ActiveChat;
