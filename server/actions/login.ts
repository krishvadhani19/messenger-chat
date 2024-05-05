"use server";

import { getUserByEmail } from "../controllers/user";
import { LoginSchema } from "../schemas/LoginSchema";
import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { prismadb } from "@/lib/prismadb";

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

  if (existingUser?.hashedPassword) {
    return { error: "Login using SSO" };
  }

  try {
    await signIn("credentials", { email, password, redirectTo: "/home" });
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

  return { success: "Confirmation email sent!" };
};
