"use server";

import {
  CourseInterestSchema,
  CourseInterestResponse,
  EnrollNewStudentRequest
} from "@/src/lib/schemas/courseInterest";
import { Result } from "@/src/types/types";
import { revalidateTag } from "next/cache";


export const courseInterest = async (
  payload: EnrollNewStudentRequest,
): Promise<Result<CourseInterestResponse>> => {
  const validationResult = CourseInterestSchema.safeParse(payload);

  if (!validationResult.success) {
    return {
      type: "error",
      message: validationResult.error.errors
        .map((err) => err.message)
        .join(", "),
    };
  }

  try {
    const response = await fetch(
      `${process.env.ENROLLMENT_API_URL}/course_interest_tracker/course-interest/`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.ENROLLMENT_SECRET}`,
        },
        body: JSON.stringify(validationResult.data),
      },
    );

    if (!response.ok) {
      // Log the backend error response for debugging
      const errorResponse = await response.json();

      // Extract the backend error message (detail) if available
      let errorMessage = `Error while handling course interest: ${response.statusText}`;

      // Check if the backend error has a 'detail' field and use it if present
      if (errorResponse && errorResponse.detail) {
        errorMessage = errorResponse.detail; // Use the backend error 'detail' message
      }

      throw new Error(errorMessage); // Throw the error with the extracted message
    }

    // Successful response parsing
    const responseData = await response.json();

    revalidateTag("fetchStudentCourseInterests")


    return {
      type: "success",
      message: "Your interest has been successfully recorded.",
      data: responseData,
    };
  } catch (error: any) {
    // Log the error
    console.error("Course Interest Error:", error);

    // Return the backend error detail if available, or the generic error message
    return {
      type: "error",
      message: error.message || "An unexpected error occurred",
    };
  }
};
