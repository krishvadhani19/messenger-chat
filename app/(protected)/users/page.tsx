"use client";

// import modules
import { useQuery } from "@tanstack/react-query";

// import files
import "./page.scss";
import ActiveChatSection from "@/components/custom/ActiveChatSection/ActiveChatSection";
import useCurrentUser from "@/hooks/useCurrentUser";
import { getAllUsers } from "@/server/actions/getAllUsers";
import UserBoxItem from "@/components/custom/UserBoxItem/UserBoxItem";

const UsersPage = () => {
  const user = useCurrentUser();
  const { isPending, data: allUserList } = useQuery({
    queryKey: ["all-user-list"],
    queryFn: async () => await getAllUsers(user?.email as string),
  });

  if (isPending) {
    <div>Loading chats</div>;
  }

  return (
    <>
      <div className="userspage-chats-section">
        {allUserList?.map((item, index) => (
          <UserBoxItem user={item} key={index} />
        ))}
      </div>

      <div className="userspage-active-chat-section">
        <ActiveChatSection />
      </div>
    </>
  );
};

export default UsersPage;
