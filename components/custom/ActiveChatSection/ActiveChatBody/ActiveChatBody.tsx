"use client";

// import modules
import { useMemo, useState } from "react";

// import files
import "./ActiveChatBody.scss";
import { FullConversationType } from "@/types";
import useCurrentUser from "@/hooks/useCurrentUser";
import classNames from "classnames";
import { useActiveChatStore } from "@/stores/useActiveChatStore";

interface ActiveChatBodyProps {
  activeChat: FullConversationType;
}

const ActiveChatBody = () => {
  const activeChat = useActiveChatStore((s) => s.activeChat);
  const currentUser = useCurrentUser();
  const messages = useMemo(() => {
    return activeChat?.messages;
  }, [activeChat?.messages]);

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
