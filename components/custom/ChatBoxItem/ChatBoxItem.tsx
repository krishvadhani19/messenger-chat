"use client";

// import modules
import { useCallback, useMemo } from "react";
import Image from "next/image";

// import files
import "./ChatBoxItem.scss";
import { ActiveChatStore } from "@/stores/useActiveChatStore";
import { FullConversationType } from "@/types";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useOtherUser } from "@/hooks/useOtherUser";

interface ChatBoxItemPropType {
  chat: FullConversationType;
}

const ChatBoxItem = ({ chat }: ChatBoxItemPropType) => {
  const currentUser = useCurrentUser();
  const otherUser = useOtherUser(chat?.users);

  const handleClick = useCallback(() => {
    ActiveChatStore().setActiveChat(chat);
  }, [chat]);

  // getting last message from list of messages
  const lastMessage = useMemo(() => {
    const messages = chat?.messages;
    return messages[messages?.length - 1];
  }, [chat]);

  // any unread messages
  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    if (currentUser?.email) {
      return false;
    }

    // message can be seen by multiple people
    const seenArray = lastMessage?.seen || [];

    // whether I have seen the last message or not
    // whether chat has unread messages
    return (
      seenArray.filter((user) => user?.email === currentUser?.email).length !==
      0
    );
  }, [lastMessage, currentUser]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "📸 Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage?.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  return (
    <div onClick={handleClick} className="chatboxitem-container">
      <div className="chatboxitem-image">
        <Image
          src={otherUser?.image || "/logo.png"}
          alt={`${otherUser?.name}`}
          width={32}
          height={32}
        />
      </div>

      <div className="chatboxitem-name">{otherUser?.name}</div>
    </div>
  );
};

export default ChatBoxItem;
