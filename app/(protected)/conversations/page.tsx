"use client";

// file imports
import { useQuery } from "@tanstack/react-query";

// file imports
import "./page.scss";
import ActiveChatSection from "@/components/custom/ActiveChatSection/ActiveChatSection";
import { getChats } from "@/server/actions/getChats";
import ChatList from "@/components/custom/ChatList/ChatList";
import { FullConversationType } from "@/types";
import ChatBoxItem from "@/components/custom/ChatBoxItem/ChatBoxItem";

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
      <div className="conversations-chats-section">
        {chatList?.map((chatItem: FullConversationType, index: number) => (
          <ChatBoxItem key={index} chat={chatItem} />
        ))}
      </div>

      <div className="conversations-active-chat-section">
        <ActiveChatSection />
      </div>
    </>
  );
};

export default ConversationsPage;
