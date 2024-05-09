"use client";

// import moudles
import { useQuery } from "@tanstack/react-query";

// import files
import useCurrentUser from "@/hooks/useCurrentUser";
import { getChats } from "@/server/controllers/user";
import ChatBoxItem from "@/components/custom/ChatBoxItem/ChatBoxItem";
import { User } from "@prisma/client";
import Button from "@/components/ui/Button/Button";
import { ActiveChatStore } from "@/stores/useActiveChatStore";

const ChatList = () => {
  const user = useCurrentUser();
  const { isPending, data: chatList } = useQuery({
    queryKey: ["chat-list"],
    queryFn: async () => await getChats(user?.email as string),
  });

  if (isPending) {
    return <div>Fetching chats</div>;
  }

  return (
    <>
      <Button onClick={() => console.log(ActiveChatStore()?.activeChat)}>
        Hey
      </Button>
      <div className="chat-list-container">
        {chatList?.map((chatItem: User, index: number) => (
          <ChatBoxItem key={index} user={chatItem} />
        ))}
      </div>
    </>
  );
};

export default ChatList;
