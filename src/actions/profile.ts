"use server";
import { auth } from "../auth";
import { cookies } from "next/headers";
import { update_profile_schema, update_profile_resp_schema } from '@/src/lib/schemas/user';
import { RequestBody, ResponseBody } from '@/src/lib/schemas/user';
export const checkUserVerification = async () => {
  const session = await auth(); // Getting JWT From Cookies
  if (!session) {

    return { isVerified: false, redirectTo: "/login" };
  }
  const token = session.access_token;
  try {
    const response = await fetch(`${process.env.BACKEND_AUTH_SERVER_URL}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      cache: "force-cache",

    });
    if (response.ok) {
      const profile = await response.json();


      // return { isVerified: profile.is_verified, redirectTo: profile.is_verified ? "/programs/flagship-program" : "/verify" };
      return profile;
    } else {
      return { isVerified: false, redirectTo: "/login" };
    }
  } catch (error) {
    return { isVerified: false, redirectTo: "/login" };
  }
};

export const updateProfile = async (
  payload: RequestBody
): Promise<{ type: "success" | "error"; message: string; data?: ResponseBody }> => {
  
  // Validate the incoming payload using the Zod schema
  const validationResult = update_profile_schema.safeParse(payload);

  if (!validationResult.success) {
    return {
      type: "error",
      message: validationResult.error.errors
        .map((err) => err.message)
        .join(", "),
    };
  }

  try {
    // Make the PATCH request to update the profile
    const response = await fetch(`${process.env.API_URL}/profile/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.API_SECRET}`,
      },
      body: JSON.stringify(validationResult.data),
    });

    // Check if the status code indicates success
    if (!response.ok) {
      throw new Error(`Failed to update profile: ${response.statusText}`);
    }

    const responseData = await response.json();

    // Validate the response using the Zod schema
    const parsedResponse = update_profile_resp_schema.safeParse(responseData);

    if (!parsedResponse.success) {
      return {
        type: "error",
        message: parsedResponse.error.errors
          .map((err) => err.message)
          .join(", "),
      };
    }

    return {
      type: "success",
      message: "Profile updated successfully",
      data: parsedResponse.data,
    };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message,
    };
  }
};