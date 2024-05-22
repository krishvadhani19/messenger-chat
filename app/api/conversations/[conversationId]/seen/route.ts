import { prismadb } from "@/lib/prismadb";
import { getCurrentUser } from "@/server/actions/getCurrentUser";
import { NextResponse } from "next/server";

interface paramsType {
  conversationId: string;
}

export const POST = async (request: Request) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { conversationId } = body;

    const conversation = await prismadb.conversation.findUnique({
      where: {
        id: conversationId,
      },

      include: {
        messages: {
          include: {
            seen: true,
          },
        },

        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse("Invalid conversationId", { status: 400 });
    }

    const lastMessage =
      conversation?.messages[conversation?.messages?.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    const updatedMessage = await prismadb.message.update({
      where: {
        id: lastMessage?.id,
      },
      data: {
        seen: {
          connect: { id: currentUser?.id },
        },
      },

      include: {
        sender: true,
        seen: true,
      },
    });

    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.log(error, "Error Message");
    return new NextResponse("Internal Error", { status: 500 });
  }
};
