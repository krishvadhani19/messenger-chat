// import modules
import { Conversation, User } from "@prisma/client";
import { useCallback, useMemo } from "react";
import axios from "axios";
import Image from "next/image";

// import files
import "./ChatBoxItem.scss";
import { ActiveChatStore } from "@/stores/useActiveChatStore";
import { FullConversationType } from "@/types";
import useCurrentUser from "@/hooks/useCurrentUser";

interface ChatBoxItemPropType {
  chat: FullConversationType;
}

const ChatBoxItem = ({ chat }: ChatBoxItemPropType) => {
  const { setActiveChat } = ActiveChatStore();
  const currentUser = useCurrentUser();

  // getting last message from list of messages
  const lastMessage = useMemo(() => {
    const messages = chat?.messages;
    return messages[messages?.length - 1];
  }, [chat]);

  const hasSeen = () => {};

  const handleClick = useCallback(async () => {
    setActiveChat(chat);
  }, [chat, setActiveChat]);

  return (
    <div onClick={handleClick} className="chatboxitem-container">
      <div className="chatboxitem-image">
        <Image src={"/logo.png"} alt={`${chat?.name}`} width={32} height={32} />
      </div>

      <div className="chatboxitem-name">{chat?.id}</div>
    </div>
  );
};

export default ChatBoxItem;
