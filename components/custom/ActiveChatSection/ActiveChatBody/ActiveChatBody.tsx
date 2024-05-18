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
  messageTimeStamp: Date;
  isMessageMine: Boolean;
}

const MessageItem = ({
  sender,
  isImage,
  message,
  isMessageMine,
  messageTimeStamp,
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
          {isMessageMine ? "You" : sender?.name}{" "}
          {messageTimeStamp.getHours() + ":" + messageTimeStamp.getMinutes()}
        </div>
      </div>

      {isImage ? (
        <Image
          src={message}
          alt=""
          width={300}
          height={200}
          className="active-chat-body-message-item-content"
        />
      ) : (
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
          <div
            className={classNames("active-chat-body-message-item-container", {
              isMessageMine,
            })}
            key={index}
          >
            <MessageItem
              isImage={isImage}
              sender={messageItem?.sender}
              message={isImage ? messageItem?.image! : messageItem?.body!}
              messageTimeStamp={messageItem?.createdAt}
              isMessageMine={isMessageMine}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ActiveChatBody;
