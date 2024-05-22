// import modules
import { useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import classNames from "classnames";
import { User } from "@prisma/client";

// import files
import "./UserBoxItem.scss";
import { ActiveChatStore } from "@/stores/useActiveChatStore";

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
    <div
      onClick={handleClick}
      className={classNames("userboxitem-container", {
        isActive: user?.id === ActiveChatStore()?.activeChat?.id,
      })}
    >
      <div className="userboxitem-image">
        <Image src={"/logo.png"} alt={`${user?.name}`} width={32} height={32} />
      </div>

      <div className="userboxitem-name">{user?.name}</div>
    </div>
  );
};

export default UserBoxItem;
