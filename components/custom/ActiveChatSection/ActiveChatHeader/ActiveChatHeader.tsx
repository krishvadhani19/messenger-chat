"use client";

// import modules
import Image from "next/image";

// import files
import "./ActiveChatHeader.scss";
import { useActiveChatStore } from "@/stores/useActiveChatStore";

const ActiveChatHeader = () => {
  const [activeChat] = useActiveChatStore((s) => [s.activeChat]);

  return (
    <div className="active-chat-header-container">
      <div>
        <Image src="/logo.png" alt="image" width={32} height={32} />
      </div>

      <div>{activeChat?.id}</div>
    </div>
  );
};

export default ActiveChatHeader;
