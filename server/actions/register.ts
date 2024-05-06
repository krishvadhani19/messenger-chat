"use server";

import * as z from "zod";
import { RegsiterSchema } from "../schemas/RegisterSchema";
import { createUser, getUserByEmail } from "../controllers/user";
import { sendVerificationToken } from "./email";
import { render } from "@react-email/render";
import { MessengerConfirmEmail } from "@/emails/RegisterEmail";
import { generateVerificationToken } from "@/server/controllers/verification-token";

export const register = async (formData: z.infer<typeof RegsiterSchema>) => {
  const validatedFields = RegsiterSchema.safeParse(formData);

  if (!validatedFields?.success) {
    return { error: "Invalid fields" };
  }

  const { name, email, password } = validatedFields?.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email already exist" };
  }

  await createUser({ name, email, password });

  const newVerificationToken = await generateVerificationToken(email);
  await sendVerificationToken({
    to: email,
    subject: `Messenger email confirmation - ${name}`,
    html: render(
      MessengerConfirmEmail({ validationCode: newVerificationToken?.token })
    ),
  });

  return {
    success: "Confirmation email sent!",
  };
};
