"use client";

// import modules
import { useQuery } from "@tanstack/react-query";

// import files
import "./page.scss";
import ActiveChatSection from "@/components/custom/ActiveChatSection/ActiveChatSection";
import useCurrentUser from "@/hooks/useCurrentUser";
import { getChats } from "@/server/controllers/user";
import ChatList from "@/components/custom/ChatList/ChatList";

const UsersPage = () => {
  const user = useCurrentUser();
  const { isPending, data: allUserList } = useQuery({
    queryKey: ["all-user-list"],
    queryFn: async () => await getChats(user?.email as string),
  });

  if (isPending) {
    <div>Loading chats</div>;
  }

  return (
    <>
      <div className="userspage-chats-section">
        <ChatList chatList={allUserList!} />
      </div>

      <div className="userspage-active-chat-section">
        <ActiveChatSection />
      </div>
    </>
  );
};

export default UsersPage;
