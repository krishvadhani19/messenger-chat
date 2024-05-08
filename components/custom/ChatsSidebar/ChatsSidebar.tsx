"use client";

// import files
import useRoutes from "@/hooks/useRoutes";
import "./ChatsSidebar.scss";
import classNames from "classnames";

const ChatsSidebar = () => {
  const routes = useRoutes();

  return (
    <div className="chats-sidebar-container">
      {routes.map((item, key) => (
        <div
          key={key}
          className={classNames("chats-sidebar-item", {
            isActive: item?.active,
          })}
          onClick={item?.onClick}
        >
          {item?.icon({ size: 22, title: item?.label })}
        </div>
      ))}
    </div>
  );
};

export default ChatsSidebar;
