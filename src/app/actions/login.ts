"use server";

import { LoginSchema } from "@/src/lib/schemas/userschema";
import { cookies } from "next/headers";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { username, password } = validatedFields.data;

  try {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const response = await fetch(
      `${process.env.BACKEND_AUTH_SERVER_URL}/user/login`,
      {
        method: "POST",
        body: formData,
        cache: "no-store",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();

      if (response.status === 401) {
        if (errorData.detail === "Incorrect email or password") {
          return {
            error: "Incorrect email or password",
            message: "Incorrect email or password",
          };
        }
      } else if (response.status === 403) {
        return {
          error: "Email not verified",
          message: "User is not verified",
        };
      }
      throw new Error(errorData.message || "An error occurred during login");
    }

    const userData = await response.json();
    const profile = userData.profile
    const tokens = {
      access_token : userData.access_token,
      refresh_token : userData.refresh_token
    };
    
    cookies().set({
      name: "user_data",
      value: JSON.stringify(profile),
      httpOnly: true,
    });

    cookies().set({
      name: "tokens",
      value: JSON.stringify(tokens),
      httpOnly: true,
    });

    return {
      success: "Authenticated!",
      message: "Welcome!",
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: "Login failed!", message: error.message };
    }
    return { error: "Login failed!", message: "An unexpected error occurred" };
  }
};
