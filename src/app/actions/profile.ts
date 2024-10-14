"use server";
import { update_profile_schema, update_profile_resp_schema } from '@/src/lib/schemas/user';
import { RequestBody, ResponseBody } from '@/src/lib/schemas/user';
import { get_profile, GetProfileResponse } from '@/src/lib/schemas/student';
import { updateProfileSchema, updateProfileResponseSchema,update_st_profile_Request,update_st_profile_Response } from '@/src/lib/schemas/student';
import { auth } from "@/src/auth";
import { revalidatePath } from 'next/cache';


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

export const update_user_Profile = async (
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

export const get_student_Profile = async (
    userId: string | undefined // Assuming user ID is a parameter to identify the profile
): Promise<{ type: "success" | "error"; message: string; data?: GetProfileResponse }> => {
    try {
        // Construct the query parameters
        const params = new URLSearchParams();
        if (userId) {
            params.append('user_id', String(userId)); // Adding the user_id as a query param
        }

        // Construct the API URL
        const apiUrl = `${process.env.API_URL}/profile?${params}`;

        // Make the GET request to fetch the profile details
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${process.env.API_SECRET}`,
            },
            cache: 'no-store' // Optional cache control
        });

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }

        // Parse the JSON response
        const responseData = await response.json();

        // Validate the response using the Zod schema
        const parsedResponse = get_profile.safeParse(responseData);

        // Check if the parsed response is valid
        if (!parsedResponse.success) {
            return {
                type: "error",
                message: parsedResponse.error.errors.map((err) => err.message).join(", "),
            };
        }

        // Return the success result with data
        return {
            type: "success",
            message: "Profile fetched successfully",
            data: parsedResponse.data,
        };

    } catch (error: any) {
        // Return the error result
        return {
            type: "error",
            message: error.message,
        };
    }
};

export const update_student_Profile = async (
  payload: update_st_profile_Request
): Promise<{
  type: "success" | "error";
  message: string;
  data?: update_st_profile_Response;
}> => {
  const session: any = await auth(); // Getting JWT From Cookies

  if (!session) {
    return {
      type: "error",
      message: "User not authenticated. Redirecting to login.",
    };
  }

  const token = session.access_token;

  // Validate the incoming payload using the Zod schema
  const validationResult = updateProfileSchema.safeParse(payload);

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
    const response = await fetch(
      `${process.env.BACKEND_AUTH_SERVER_URL}/student/profile`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(validationResult.data),
      }
    );

    // Check if the status code indicates success
    if (!response.ok) {
      const errorResponse = await response.text(); // Use text() instead of json() for non-JSON responses
      console.error("Failed to update profile:", errorResponse);
      return {
        type: "error",
        message: `Failed to update profile: ${response.statusText} (${response.status})`,
      };
    }

    const responseData = await response.json();

    revalidatePath("/dashboard/profile");

    // Validate the response using the Zod schema
    const parsedResponse = updateProfileResponseSchema.safeParse(responseData);

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
    console.error("Error in updating profile:", error);
    return {
      type: "error",
      message: error.message,
    };
  }
};
