"use client";

// import modules

// import files
import "./ActiveChatSection.scss";
import ActiveChatHeader from "./ActiveChatHeader/ActiveChatHeader";
import ChatInput from "./ActiveChatInput/ActiveChatInput";
import ActiveChatBody from "./ActiveChatBody/ActiveChatBody";
import { useActiveChatStore } from "@/stores/useActiveChatStore";

const ActiveChat = () => {
  const activeChat = useActiveChatStore((s) => s.activeChat);

  return (
    <div className="active-chat-section-container">
      <ActiveChatHeader />

      <ActiveChatBody activeChat={activeChat!} />

      <ChatInput />
    </div>
  );
};

export default ActiveChat;
