"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useCurrentUser();
  const fetchUser = useUserStore((s) => s.fetchUser);

  useEffect(() => {
    fetchUser(user?.email as string);
  }, []);

  return <>{children}</>;
};

export default ProtectedLayout;
