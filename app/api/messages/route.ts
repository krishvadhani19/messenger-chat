import { prismadb } from "@/lib/prismadb";
import { getCurrentUser } from "@/server/actions/getCurrentUser";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await request.json();

    const { message, image, conversationId } = body;

    const newMessage = await prismadb.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },

        sender: {
          connect: {
            id: currentUser?.id,
          },
        },

        seen: {
          connect: {
            id: currentUser?.id,
          },
        },
      },

      include: {
        seen: true,
        sender: true,
      },
    });

    const updatedConversation = await prismadb.conversation.update({
      where: { id: conversationId },
      data: { lastMessageAt: new Date() },
    });
  } catch (error) {
    console.log({ error });

    return new NextResponse("Internal Error", { status: 500 });
  }
};
