"use server";

import { prismadb } from "@/lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export const getChats = async () => {
  const currentUser = await getCurrentUser();
  const currentUserId = currentUser?.id;

  if (!currentUserId) {
    return [];
  }

  try {
    const chats = await prismadb.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: currentUserId,
        },
      },

      // populating user as in while fetching data you get entire User and not just id
      include: {
        users: true,

        // for last seen and last message
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });

    return chats;
  } catch (error) {
    return [];
  }
};
