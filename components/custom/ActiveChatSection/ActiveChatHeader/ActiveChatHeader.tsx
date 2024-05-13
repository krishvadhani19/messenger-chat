"use client";

// import modules
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { useMemo } from "react";

// import files
import "./ActiveChatHeader.scss";
import { useActiveChatStore } from "@/stores/useActiveChatStore";
import { useOtherUser } from "@/hooks/useOtherUser";

const ActiveChatHeader = () => {
  const [activeChat] = useActiveChatStore((s) => [s.activeChat]);
  const otherUser = useOtherUser(activeChat?.users!);

  const statusText = useMemo(() => {
    if (activeChat?.isGroup) {
      return activeChat?.users?.length;
    }

    // Todo acc to active/inactive status
    return "Active";
  }, [activeChat?.isGroup, activeChat?.users]);

  return (
    <div className="active-chat-header-container">
      <div className="active-chat-header-avatar">
        <Image src="/logo.png" alt="image" width={32} height={32} />
      </div>

      <div className="active-chat-header-desc">
        <div className="active-chat-header-name">
          {activeChat?.isGroup ? activeChat?.name : otherUser?.name}
        </div>

        <div className="active-chat-header-status">{statusText}</div>
      </div>

      <div className="active-chat-header-three-dots">
        <BsThreeDots size={22} />
      </div>
    </div>
  );
};

export default ActiveChatHeader;
