"use client";

// import modules

// import files
import "./page.scss";
import ChatsSection from "@/components/custom/ChatsSection/ChatsSection";
import ActiveChatSection from "@/components/custom/ActiveChatSection/ActiveChatSection";
import ChatsSidebar from "@/components/custom/ChatsSidebar/ChatsSidebar";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="homepage-chats-sidebar">
        <ChatsSidebar />
      </div>

      <div className="homepage-chats-section">
        <ChatsSection />
      </div>

      <div className="homepage-active-chat-section">
        <ActiveChatSection />
      </div>
    </div>
  );
};

export default HomePage;
