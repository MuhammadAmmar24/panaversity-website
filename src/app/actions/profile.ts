"use server";
import { auth } from "@/src/lib/auth";
import {
  update_st_profile_Request,
  update_st_profile_Response,
  updateProfileResponseSchema,
  updateProfileSchema
} from "@/src/lib/schemas/student";
import { revalidateTag } from "next/cache";




export const update_student_Profile = async (
  payload: update_st_profile_Request,
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
      },
    );

    // Check if the status code indicates success
    if (!response.ok) {
      const errorResponse = await response.text(); // Use text() instead of json() for non-JSON responses
      return {
        type: "error",
        message: `Failed to update profile: ${response.statusText} (${response.status})`,
      };
    }

    const responseData = await response.json();

    revalidateTag("fetchStudentProfileTag");

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
