// import modules
import { useCallback } from "react";
import axios from "axios";
import Image from "next/image";

// import files
import "./UserBoxItem.scss";
import { ActiveChatStore } from "@/stores/useActiveChatStore";
import { User } from "@prisma/client";

interface ChatBoxItemPropType {
  user: User;
}

const UserBoxItem = ({ user }: ChatBoxItemPropType) => {
  const { setActiveChat } = ActiveChatStore();

  const handleClick = useCallback(async () => {
    const { data: conversation } = await axios.post("/api/conversations", {
      userId: user?.id,
    });

    setActiveChat(conversation);
  }, [setActiveChat, user]);

  return (
    <div onClick={handleClick} className="chatboxitem-container">
      <div className="chatboxitem-image">
        <Image src={"/logo.png"} alt={`${user?.name}`} width={32} height={32} />
      </div>

      <div className="chatboxitem-name">{user?.name}</div>
    </div>
  );
};

export default UserBoxItem;
