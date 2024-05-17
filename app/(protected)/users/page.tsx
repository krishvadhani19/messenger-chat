"use client";

// import modules
import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

// import files
import "./page.scss";
import ActiveChatSection from "@/components/custom/ActiveChatSection/ActiveChatSection";
import useCurrentUser from "@/hooks/useCurrentUser";
import { getAllUsers } from "@/server/actions/getAllUsers";
import UserBoxItem from "@/components/custom/UserBoxItem/UserBoxItem";
import { TiUserAdd } from "react-icons/ti";
import { useActiveChatStore } from "@/stores/useActiveChatStore";

const UsersPage = () => {
  const user = useCurrentUser();
  const { isPending, data: allUserList } = useQuery({
    queryKey: ["all-user-list"],
    queryFn: async () => await getAllUsers(user?.email as string),
  });

  const [activeChat] = useActiveChatStore(useShallow((s) => [s.activeChat]));

  if (isPending) {
    <div>Loading chats</div>;
  }

  return (
    <>
      <div className="userspage-chats-section">
        <div className="userspage-chats-section-heading">
          <div className="">Users</div>

          <div className="userspage-chats-section-add-user">
            <TiUserAdd size={24} />
          </div>
        </div>

        {allUserList?.map((item, index) => (
          <UserBoxItem user={item} key={index} />
        ))}
      </div>

      {activeChat && (
        <div className="userspage-active-chat-section">
          <ActiveChatSection />
        </div>
      )}
    </>
  );
};

export default UsersPage;
