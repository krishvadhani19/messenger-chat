"use client";

// import files
import "./page.scss";
import ChatsSection from "@/components/custom/ChatsSection/ChatsSection";
import ActiveChatSection from "@/components/custom/ActiveChatSection/ActiveChatSection";
import ChatsSidebar from "@/components/custom/ChatsSidebar/ChatsSidebar";
import { useUserStore } from "@/stores/useUserStore";
import Button from "@/components/ui/Button/Button";

// import modules

const HomePage = () => {
  const [user, fetchUser] = useUserStore((s) => [s.user, s.fetchUser]);

  return (
    <>
      <Button
        onClick={() => {
          console.log({ user });
        }}
      >
        Hello
      </Button>
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
    </>
  );
};

export default HomePage;
