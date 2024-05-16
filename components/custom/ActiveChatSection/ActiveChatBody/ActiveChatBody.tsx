"use client";

// import modules
import { useState } from "react";

// import files
import "./ActiveChatBody.scss";
import { FullConversationType } from "@/types";
import useCurrentUser from "@/hooks/useCurrentUser";
import classNames from "classnames";

interface ActiveChatBodyProps {
  activeChat: FullConversationType;
}

const ActiveChatBody = ({ activeChat }: ActiveChatBodyProps) => {
  const [messages, setMessages] = useState(activeChat?.messages);
  const currentUser = useCurrentUser();

  return (
    <div className="active-chat-body-container">
      {messages?.map((messageItem, index) => {
        const isMessageMine = messageItem?.senderId === currentUser?.id;
        const isImage = !!messageItem?.image;

        return (
          <div
            key={index}
            className={classNames("active-chat-body-message-item", {
              isMessageMine,
            })}
          >
            {!isImage ? messageItem?.body : "hello"}
          </div>
        );
      })}
    </div>
  );
};

export default ActiveChatBody;
