import { useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import { User } from "@prisma/client";

export const useOtherUser = (users: User[]) => {
  const currentUser = useCurrentUser();

  const otherUser = useMemo(() => {
    const otherUsers = users.filter(
      (user: User) => user?.id !== currentUser?.id
    );

    return otherUsers?.[0];
  }, [users, currentUser]);

  return otherUser;
};
