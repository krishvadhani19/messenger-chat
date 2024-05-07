"use client";

import Button from "@/components/Button/Button";
import { logout } from "@/server/actions/logout";
import "./page.scss";

const HomePage = () => {
  return (
    <>
      <Button
        onClick={async () => {
          await logout();
        }}
      >
        Log out
      </Button>

      <div className="homepage-container">
        <div className="homepage-chats-section">Chats</div>

        <div className="homepage-active-chat-section">Active Chat</div>
      </div>
    </>
  );
};

export default HomePage;
