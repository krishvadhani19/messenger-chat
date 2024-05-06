"use server";

import * as z from "zod";
import { VerifyEmailSchema } from "../schemas/VerifyEmailSchema";

export const verifyEmail = async (
  formData: z.infer<typeof VerifyEmailSchema>
) => {
  const validatedFields = VerifyEmailSchema.safeParse(formData);

  if (!validatedFields?.success) {
    return { error: "Something went wrong!" };
  }
};
