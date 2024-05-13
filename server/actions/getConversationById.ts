"use server";

import { prismadb } from "@/lib/prismadb";
import { getCurrentUser } from "@/server/actions/getCurrentUser";

export const getCOnversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const conversation = prismadb.conversation.findUnique({
      where: { id: conversationId },
      include: {
        users: true,
      },
    });

    return conversation;
  } catch (error) {
    return null;
  }
};
