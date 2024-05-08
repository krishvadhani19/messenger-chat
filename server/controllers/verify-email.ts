"use server";

import { prismadb } from "@/lib/prismadb";
import crypto from "crypto";

export const generateVerificationToken = async (email: string) => {
  /**
   * If there is an existing token then delete
   */
  const existingToken = await prismadb.verificationToken.findFirst({
    where: { email },
  });

  if (existingToken) {
    await prismadb.verificationToken.delete({
      where: { id: existingToken?.id },
    });
  }

  /**
   * Generating new token
   */
  const newToken = crypto.randomInt(1_00_000, 1_000_000) + "";

  /**
   * 1 hour expiry
   */
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const newVerificationToken = await prismadb.verificationToken.create({
    data: { email, token: newToken, expires },
  });

  return newVerificationToken;
};

export const getVerificationTokenUsingEmail = async (email: string) => {
  try {
    const verficationToken = await prismadb.verificationToken.findFirst({
      where: { email },
    });

    return verficationToken;
  } catch (error) {
    return null;
  }
};
