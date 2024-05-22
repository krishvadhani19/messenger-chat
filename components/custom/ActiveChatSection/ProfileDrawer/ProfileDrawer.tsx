"use client";

import { useOtherUser } from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & { users: User[] };
}

const ProfileDrawer = ({ isOpen, onClose, data }: ProfileDrawerProps) => {
  const otherUser = useOtherUser(data?.users);

  return <div>ProfileDrawer</div>;
};

export default ProfileDrawer;
