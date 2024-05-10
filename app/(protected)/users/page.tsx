"use client";

// import modules

// import files
import "./page.scss";
import ChatsSection from "@/components/custom/ChatsSection/ChatsSection";
import ActiveChatSection from "@/components/custom/ActiveChatSection/ActiveChatSection";
import ChatsSidebar from "@/components/custom/ChatsSidebar/ChatsSidebar";

const UsersPage = () => {
  return (
    <div className="userspage-container">
      <div className="userspage-chats-sidebar">
        <ChatsSidebar />
      </div>

      <div className="userspage-chats-section">
        <ChatsSection />
      </div>

      <div className="userspage-active-chat-section">
        <ActiveChatSection />
      </div>
    </div>
  );
};

export default UsersPage;
