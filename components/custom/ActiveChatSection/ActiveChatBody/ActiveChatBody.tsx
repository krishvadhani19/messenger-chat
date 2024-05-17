"use client";

// import modules
import { useMemo } from "react";

// import files
import "./ActiveChatBody.scss";
import useCurrentUser from "@/hooks/useCurrentUser";
import classNames from "classnames";
import { useActiveChatStore } from "@/stores/useActiveChatStore";
import Image from "next/image";

interface MessageItemProps {
  sender: any;
  isImage: Boolean;
  message: string;
  isMessageMine: Boolean;
}

const MessageItem = ({
  sender,
  isImage,
  message,
  isMessageMine,
}: MessageItemProps) => {
  return (
    <div
      className={classNames("active-chat-body-message-item", {
        isMessageMine,
      })}
    >
      <div className="active-chat-body-message-item-desc">
        <Image
          src={sender?.image || "/logo.png"}
          alt=""
          width={32}
          height={32}
        />

        <div className="active-chat-body-message-item-name">
          {isMessageMine ? "You" : sender?.name}
        </div>
      </div>

      {!isImage && (
        <div className="active-chat-body-message-item-content">{message}</div>
      )}
    </div>
  );
};

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
          <MessageItem
            key={index}
            sender={messageItem?.sender}
            isImage={isImage}
            message={messageItem?.body!}
            isMessageMine={isMessageMine}
          />
        );
      })}
    </div>
  );
};

export default ActiveChatBody;
