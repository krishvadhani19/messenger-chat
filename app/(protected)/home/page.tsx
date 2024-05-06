"use client";

import Button from "@/components/Button/Button";
import { logout } from "@/server/actions/logout";

const HomePage = () => {
  return (
    <div>
      <Button
        onClick={async () => {
          await logout();
        }}
      >
        Log out
      </Button>
    </div>
  );
};

export default HomePage;
