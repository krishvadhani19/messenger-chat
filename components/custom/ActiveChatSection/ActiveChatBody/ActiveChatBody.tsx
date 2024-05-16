"use client";

// import modules
import { useState } from "react";

// import files
import "./ActiveChatBody.scss";
import { FullConversationType } from "@/types";

interface ActiveChatBodyProps {
  activeChat: FullConversationType;
}

const ActiveChatBody = ({ activeChat }: ActiveChatBodyProps) => {
  const [messages, setMessages] = useState();

  return <div className="active-chat-body-container">ActiveChatBody</div>;
};

export default ActiveChatBody;
