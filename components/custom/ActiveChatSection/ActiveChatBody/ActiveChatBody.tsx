"use client";

// import modules

// import files
import { useState } from "react";
import "./ActiveChatBody.scss";
import { FullConversationType } from "@/types";

interface ActiveChatBodyProps {
  activeChat: FullConversationType;
}

const ActiveChatBody = ({ activeChat }: ActiveChatBodyProps) => {
  const [messages, setMessages] = useState();

  return <div>ActiveChatBody</div>;
};

export default ActiveChatBody;
