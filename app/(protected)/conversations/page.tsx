"use client";

// module imports
import { useQuery } from "@tanstack/react-query";

// file imports
import "./page.scss";
import ActiveChatSection from "@/components/custom/ActiveChatSection/ActiveChatSection";
import { getChats } from "@/server/actions/getChats";
import { FullConversationType } from "@/types";
import ChatBoxItem from "@/components/custom/ChatBoxItem/ChatBoxItem";
import { TiUserAdd } from "react-icons/ti";

const ConversationsPage = () => {
  const { isPending, data: chatList } = useQuery({
    queryKey: ["chat-list"],
    queryFn: async () => await getChats(),
  });

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

      <div className="conversations-page-active-chat-section">
        <ActiveChatSection />
      </div>
    </>
  );
};

export default ConversationsPage;
