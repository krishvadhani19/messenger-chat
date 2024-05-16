import { auth } from "@/auth";
import { prismadb } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const session = await auth();
    const body = await request.json();
    const { userId, isGroup, members, name: groupName } = body;

    /**
     * Getting current user if from session
     */
    const currentUserId = session?.user?.id;

    /**
     * If there is no session then return Unauthorized
     */
    if (!session?.user?.email || !session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    /**
     * Create a group conversation but if the number of members is less than 2 or there is not a group name
     */
    if (isGroup && (members?.length < 2 || !groupName)) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    /**
     * Creating a group chat
     */
    if (isGroup) {
      const newConversation = await prismadb.conversation.create({
        data: {
          name: groupName,
          isGroup,
          users: {
            connect: [
              // all members are destructured
              ...members.map((item: { value: string }) => ({
                id: item?.value,
              })),
              // current user is added seprarately since it will not be in the member list
              { id: currentUserId },
            ],
          },
        },

        // populating user as in while fetching data you get entire User and not just id
        include: { users: true },
      });

      return NextResponse.json(newConversation);
    }

    /**
     * creating a private chat
     */
    // Here we use findMany to find if there is any previous private chats with this person
    const existingConversations = await prismadb.conversation.findMany({
      where: {
        OR: [
          {
            userIds: { equals: [currentUserId, userId] },
          },
          {
            userIds: { equals: [userId, currentUserId] },
          },
        ],
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

    const privateConversation = existingConversations?.[0];
    if (privateConversation) {
      return NextResponse.json(privateConversation);
    }

    const newPrivateConversation = await prismadb.conversation.create({
      data: {
        users: {
          // creating private chat between current user and requested user
          connect: [{ id: userId }, { id: currentUserId }],
        },
      },
    });

    return NextResponse.json(newPrivateConversation);
  } catch (error) {
    return new NextResponse("internal Error", { status: 500 });
  }
};
