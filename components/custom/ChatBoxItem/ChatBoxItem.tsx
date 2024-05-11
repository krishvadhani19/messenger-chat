// import modules
import { Conversation, User } from "@prisma/client";
import { useCallback } from "react";
import axios from "axios";
import Image from "next/image";

// import files
import "./ChatBoxItem.scss";
import { ActiveChatStore } from "@/stores/useActiveChatStore";
import { FullConversationType } from "@/types";

interface ChatBoxItemPropType {
  chat: FullConversationType;
}

const ChatBoxItem = ({ chat }: ChatBoxItemPropType) => {
  const { setActiveChat } = ActiveChatStore();

  const handleClick = useCallback(async () => {
    const { data: conversation } = await axios.post("/api/conversations", {
      userId: chat?.id,
    });

    setActiveChat(conversation);
  }, [setActiveChat, chat]);

  return (
    <div onClick={handleClick} className="chatboxitem-container">
      <div className="chatboxitem-image">
        <Image src={"/logo.png"} alt={`${chat?.name}`} width={32} height={32} />
      </div>

      <div className="chatboxitem-name">{chat?.name}</div>
    </div>
  );
};

export default ChatBoxItem;
