"use client";

// import modules

// import files
import ChatBoxItem from "@/components/custom/ChatBoxItem/ChatBoxItem";
import { FullConversationType } from "@/types";

interface ChatListPropType {
  chatList: FullConversationType[];
}

const ChatList = ({ chatList }: ChatListPropType) => {
  return (
    <div className="chat-list-container">
      {chatList?.map((chatItem: FullConversationType, index: number) => (
        <ChatBoxItem key={index} chat={chatItem} />
      ))}
    </div>
  );
};

export default ChatList;
