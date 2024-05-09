"use client";

import Button from "@/components/ui/Button/Button";
import useCurrentUser from "@/hooks/useCurrentUser";
import { getChats } from "@/server/controllers/user";
import { useQuery } from "@tanstack/react-query";

const ChatList = () => {
  const user = useCurrentUser();
  const {
    isPending,
    data: chatList,
  } = useQuery({
    queryKey: ["chat-list"],
    queryFn: async () => await getChats(user?.email as string),
  });

  return (
    <div>
      <Button
        onClick={() => {
          console.log({ chatList });
        }}
      >
        Click
      </Button>
    </div>
  );
};

export default ChatList;
