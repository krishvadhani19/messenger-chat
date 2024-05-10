import { auth } from "@/auth";
import { prismadb } from "@/lib/prismadb";

export const getChats = async () => {
  const session = await auth();
  const currentUserId = session?.user?.id;

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
