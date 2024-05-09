"use client";

// import modules
import Link from "next/link";

// import files
import "./ChatsSidebar.scss";
import useRoutes from "@/hooks/useRoutes";
import classNames from "classnames";
import { useUserStore } from "@/stores/useUserStore";
import Image from "next/image";

const ChatsSidebar = () => {
  const routes = useRoutes();
  const user = useUserStore((s) => s.user);

  return (
    <>
      <div className="chats-sidebar-container">
        <div className="chat-sidebar-routes">
          {routes.map((item, key) => (
            <Link
              href={item?.href}
              key={key}
              className={classNames("chats-sidebar-item", {
                isActive: item?.active,
              })}
              onClick={item?.onClick}
            >
              {item?.icon({ size: 22, title: item?.label })}
            </Link>
          ))}
        </div>

        <div className="chats-sidebar-user-avataar">
          <Image
            src={user?.image || "/logo.png"}
            alt="user-image"
            width="32"
            height="32"
          />
        </div>
      </div>
    </>
  );
};

export default ChatsSidebar;
