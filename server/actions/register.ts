"use server";

import * as z from "zod";
import { RegsiterSchema } from "../schemas/RegisterSchema";
import { createUser, getUserByEmail } from "../controllers/user";

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

  return { success: "User created" };
};
