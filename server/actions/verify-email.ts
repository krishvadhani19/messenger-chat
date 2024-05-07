"use server";

import * as z from "zod";
import { VerifyEmailSchema } from "../schemas/VerifyEmailSchema";
import { getVerificationTokenUsingEmail } from "../controllers/verify-email";
import { prismadb } from "@/lib/prismadb";

export const verifyEmail = async (
  formData: z.infer<typeof VerifyEmailSchema>,
  email: string
) => {
  const validatedFields = VerifyEmailSchema.safeParse(formData);

  if (!validatedFields?.success) {
    return { error: "Invalid fields" };
  }

  const { otp } = validatedFields?.data;

  /**
   * Get verification token from DB using OTP
   */
  const verificationToken = await getVerificationTokenUsingEmail(email);

  // Check if OTP exists for that email
  if (!verificationToken) {
    return { error: "Something wenet wrong" };
  }

  // Check expiry
  const hasExpired = new Date(verificationToken?.expires) < new Date();
  if (hasExpired) {
    return { error: "OTP expired, please generate new!" };
  }

  // Updating email verified of the user
  await prismadb.user.update({
    where: { email: verificationToken?.email },
    data: { emailVerified: new Date() },
  });

  // Compare OTP
  if (verificationToken?.token === otp) {
    return { success: "Email confirmed!" };
  }

  return { error: "Something wenet wrong" };
};
