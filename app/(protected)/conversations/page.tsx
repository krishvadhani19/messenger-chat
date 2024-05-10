"use client";

// file imports
import { useQuery } from "@tanstack/react-query";

// file imports
import "./page.scss";
import useCurrentUser from "@/hooks/useCurrentUser";
import ActiveChatSection from "@/components/custom/ActiveChatSection/ActiveChatSection";
import { getChats } from "@/server/actions/getChats";

const ConversationsPage = () => {
  const user = useCurrentUser();
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
        {/* <ChatList chatList={chatList!} /> */}
      </div>

      <div className="conversations-active-chat-section">
        <ActiveChatSection />
      </div>
    </>
  );
};

export default ConversationsPage;
