// import modules
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChat, HiUsers } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";
import { IconType } from "react-icons";

// import files
import useConversation from "./useConversation";
import { logout } from "@/server/actions/logout";

export interface RouteType {
  label: string;
  href: string;
  icon: IconType;
  onClick: () => void;
  active: boolean;
}

const useRoutes = () => {
  const pathname = usePathname();

  const { conversationId } = useConversation();

  const routes: RouteType[] = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: HiChat,
        onClick: async () => {},
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUsers,
        onClick: async () => {},
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "#",
        icon: TbLogout,
        onClick: async () => await logout(),
        active: pathname === "/users",
      },
    ],
    [conversationId, pathname]
  );

  return routes;
};

export default useRoutes;
