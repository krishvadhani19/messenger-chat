// import modules
import { Conversation, User } from "@prisma/client";
import { useCallback } from "react";
import axios from "axios";
import Image from "next/image";

// import files
import "./ChatBoxItem.scss";
import { ActiveChatStore } from "@/stores/useActiveChatStore";

const ChatBoxItem = ({ user }: { user: User }) => {
  const { setActiveChat } = ActiveChatStore();

  const handleClick = useCallback(async () => {
    const { data: conversation }: { data: Conversation } = await axios.post(
      "/api/conversations",
      {
        userId: user?.id,
      }
    );

    setActiveChat(conversation);
  }, [setActiveChat, user]);

  return (
    <div onClick={handleClick} className="chatboxitem-container">
      <div className="chatboxitem-image">
        <Image
          src={user?.image || "/logo.png"}
          alt={`${user?.name}`}
          width={32}
          height={32}
        />
      </div>

      <div className="chatboxitem-name">{user?.name}</div>
    </div>
  );
};

export default ChatBoxItem;
