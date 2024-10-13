"use server";

import * as z from "zod";
import { PasswordUpdateSchema } from "@/src/schemas/userschema";

export const changePassword = async (values: z.infer<typeof PasswordUpdateSchema>) => {
  const validatedFields = PasswordUpdateSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, current_password, new_password } = validatedFields.data;

  // Check if current password and new password are the same
  if (current_password === new_password) {
    return { error: "New password cannot be the same as the current password" };
  }

  try {
    // Make the API request to the backend to update the password
    const password_update_request = await fetch(`${process.env.BACKEND_AUTH_SERVER_URL}/auth/update-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email ,
        current_password,
        new_password,
      }),
      cache: "no-store",
    });

    console.log(password_update_request.status)
    // Handle different response statuses
    if (password_update_request.status === 403) {
      return { error: "User is not verified" };
    }
    if (password_update_request.status === 400) {
      return { error: "New password cannot be the same as the current password" };
    }
    if (password_update_request.status !== 200) {
      return { error: "An error occurred while updating the password" };
    }

    const data = await password_update_request.json();
    console.log(data);
    return { message: data.message };
  } catch (error) {
    console.error("Fetch error:", error);
    return { error: "Failed to update the password" };
  }
};
