"use server";

import { getUserByEmail } from "../controllers/user";
import { LoginSchema } from "../schemas/LoginSchema";
import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { generateVerificationToken } from "../controllers/verify-email";
import { sendVerificationToken } from "./email";
import MessengerConfirmEmail from "@/emails/RegisterEmail";
import { render } from "@react-email/render";

export const login = async (formData: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(formData);

  if (!validatedFields?.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields?.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "User does not exist" };
  }

  if (!existingUser?.hashedPassword) {
    return { error: "Login using SSO" };
  }

  /**
   * Signin but email not verified
   */
  if (!existingUser?.emailVerified) {
    const newVerificationToken = await generateVerificationToken(email);
    await sendVerificationToken({
      to: email,
      subject: `Messenger email confirmation - ${existingUser?.name}`,
      html: render(
        MessengerConfirmEmail({ validationCode: newVerificationToken?.token })
      ),
    });

    return {
      success: "Confirmation email sent!",
    };
  }

  try {
    await signIn("credentials", { email, password, redirectTo: "/users" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error?.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong!" };
      }
    }
  }

  return {
    success: "Login successful!",
  };
};
