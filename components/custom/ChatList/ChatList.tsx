"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import { getChats } from "@/server/controllers/user";
import { useQuery } from "@tanstack/react-query";

const ChatList = () => {
  const user = useCurrentUser();
  const {
    isPending,
    isError,
    data: chaList,
    error,
  } = useQuery({
    queryKey: ["chat-list"],
    queryFn: () => getChats(user?.email as string),
  });

  console.log({ chaList });
  return <div>ChatList</div>;
};

export default ChatList;
