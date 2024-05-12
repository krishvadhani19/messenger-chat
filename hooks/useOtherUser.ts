import { useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import { User } from "@prisma/client";

export const useOtherUser = (users: User[]) => {
  const currentUser = useCurrentUser();

  const otherUsers = useMemo(() => {
    const otherUsers = users.filter(
      (user: User) => user?.id !== currentUser?.id
    );

    return otherUsers;
  }, [users, currentUser]);

  return otherUsers;
};
