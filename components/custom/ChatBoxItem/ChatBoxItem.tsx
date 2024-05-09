// import modules
import { User } from "@prisma/client";
import { useCallback } from "react";

// import files
import "./ChatBoxItem.scss";
import { ActiveChatStore } from "@/stores/useActiveChatStore";
import Image from "next/image";

const ChatBoxItem = ({ user }: { user: User }) => {
  const { setActiveChat } = ActiveChatStore();

  const handleClick = useCallback(() => {
    setActiveChat(user);
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
