"use client";

// import moudles
import { User } from "@prisma/client";

// import files
import ChatBoxItem from "@/components/custom/ChatBoxItem/ChatBoxItem";

interface ChatListPropType {
  chatList: User[];
}

const ChatList = ({ chatList }: ChatListPropType) => {
  return (
    <div className="chat-list-container">
      {chatList?.map((chatItem: User, index: number) => (
        <ChatBoxItem key={index} user={chatItem} />
      ))}
    </div>
  );
};

export default ChatList;
