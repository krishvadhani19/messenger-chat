"use server";

import { prismadb } from "@/lib/prismadb";

export const getAllUsers = async (email: string) => {
  if (!email) {
    return [];
  }

  try {
    const allUsers = await prismadb.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email,
        },
      },
    });

    return allUsers;
  } catch (error) {
    return null;
  }
};
