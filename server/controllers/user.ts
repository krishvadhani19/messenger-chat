"use server";

// Module imports
import * as z from "zod";
import bcrypt from "bcryptjs";

// File imports
import { prismadb } from "@/lib/prismadb";
import { RegsiterSchema } from "@/server/schemas/RegisterSchema";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prismadb.user.findUnique({
      where: { email },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const createUser = async ({
  name,
  email,
  password,
}: z.infer<typeof RegsiterSchema>) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prismadb.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return newUser;
  } catch (error) {
    return null;
  }
};

export const getChats = async (email: string) => {
  if (!email) {
    return [];
  }

  try {
    const chats = await prismadb.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email,
        },
      },
    });

    return chats;
  } catch (error) {
    return null;
  }
};
