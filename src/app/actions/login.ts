"use server";

import * as z from "zod";
import { cookies } from "next/headers";
import { LoginSchema } from "@/src/schemas/userschema";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { checkUserVerification } from "@/src/app/actions/profile";

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
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      if (response.status === 401) {
        // if (errorData.detail === "User with this email is not verified") {
        //   return {
        //     error: "Email not verified",
        //     message: "User with this email is not verified",
        //   };
        // }
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

    const expiresInMilliseconds = userData.expires_in * 1000;

    const updatedUserData = {
      ...userData,
      accessTokenExpires: Date.now() + expiresInMilliseconds,
    };

    cookies().set({
      name: "user_data",
      value: JSON.stringify(updatedUserData),
      httpOnly: true,
    });

    const verificationStatus = await checkUserVerification();
    return {
      success: "Authenticated!",
      message: "Welcome!",
      redirectTo: verificationStatus.redirectTo,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: "Login failed!", message: error.message };
    }
    return { error: "Login failed!", message: "An unexpected error occurred" };
  }
};
