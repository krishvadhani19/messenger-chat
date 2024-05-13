"use client";

// module imports
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { TiUserAdd } from "react-icons/ti";

// file imports
import "./page.scss";
import ActiveChatSection from "@/components/custom/ActiveChatSection/ActiveChatSection";
import { getChats } from "@/server/actions/getChats";
import { FullConversationType } from "@/types";
import ChatBoxItem from "@/components/custom/ChatBoxItem/ChatBoxItem";
import { useActiveChatStore } from "@/stores/useActiveChatStore";

const ConversationsPage = () => {
  const { isPending, data: chatList } = useQuery({
    queryKey: ["chat-list"],
    queryFn: async () => await getChats(),
  });

  const [activeChat] = useActiveChatStore(useShallow((s) => [s.activeChat]));

  if (isPending) {
    <div>Loading chats</div>;
  }

  return (
    <>
      <div className="conversations-page-chats-section">
        <div className="conversations-page-chats-section-heading">
          <div className="">Messages</div>

          <div
            className="conversations-page-chats-section-add-user"
            onClick={() => {}}
          >
            <TiUserAdd size={24} />
          </div>
        </div>

        {chatList?.map((chatItem: FullConversationType, index: number) => (
          <ChatBoxItem key={index} chat={chatItem} />
        ))}
      </div>

      {activeChat && (
        <div className="conversations-page-active-chat-section">
          <ActiveChatSection />
        </div>
      )}
    </>
  );
};

export default ConversationsPage;
