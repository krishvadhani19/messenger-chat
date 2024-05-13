"use server";

import { prismadb } from "@/lib/prismadb";

export const getMessages = async (conversationId: string) => {
  try {
    const messages = await prismadb.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  } catch (error) {
    return [];
  }
};
