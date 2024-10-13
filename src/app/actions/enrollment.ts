"use server";

import {
  EnrollCourseRequest,
  EnrollCourseRequestSchema,
  EnrollCourseResponse,
  EnrollCourseResponseSchema,
  EnrollNewStudentRequest,
  EnrollNewStudentRequestSchema,
  EnrollNewStudentResponse,
  EnrollNewStudentResponseSchema,
  EnrollStudentRequest,
  EnrollStudentRequestSchema,
  EnrollStudentResponse,
  EnrollStudentResponseSchema,
} from "@/src/lib/schemas/enrollment";
import { Result } from "@/src/lib/types";
import { revalidatePath, revalidateTag } from "next/cache";

export const enrollStudentInProgram = async (
  payload: EnrollStudentRequest
): Promise<Result<EnrollStudentResponse>> => {
  const validationResult = EnrollStudentRequestSchema.safeParse(payload);

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
      `${process.env.ENROLLMENT_API_URL}/enrollment/programs/enroll`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.ENROLLMENT_SECRET}`,
        },
        body: JSON.stringify(validationResult.data),
      }
    );

    if (response.status !== 201) {
      throw new Error(`Failed to enroll student: ${response.statusText}`);
    }

    const responseData = await response.json();

    const parsedResponse = EnrollStudentResponseSchema.safeParse(responseData);

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
      message: "Student enrolled successfully",
      data: parsedResponse.data,
    };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message,
    };
  }
};

export const enrollNewStudentInProgramAndCourse = async (
  payload: EnrollNewStudentRequest
): Promise<Result<EnrollNewStudentResponse>> => {
  const validationResult = EnrollNewStudentRequestSchema.safeParse(payload);

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
      `${process.env.ENROLLMENT_API_URL}/enrollment/new`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.ENROLLMENT_SECRET}`,
        },
        body: JSON.stringify(validationResult.data),
      }
    );

    if (!response.ok) {
      // Log the backend error response for debugging
      const errorResponse = await response.json();
     

      // Extract the backend error message (detail) if available
      let errorMessage = `Failed to enroll student in program and course: ${response.statusText}`;

      // Check if the backend error has a 'detail' field and use it if present
      if (errorResponse && errorResponse.detail) {
        errorMessage = errorResponse.detail; // Use the backend error 'detail' message
      }

      throw new Error(errorMessage); // Throw the error with the extracted message
    }

    // Successful response parsing
    const responseData = await response.json();
    revalidatePath("/dashboard");

    return {
      type: "success",
      message: "Student enrolled in program and course successfully",
      data: responseData,
    };
  } catch (error: any) {
    // Log the error
    console.error("Enrollment error:", error);

    // Return the backend error detail if available, or the generic error message
    return {
      type: "error",
      message: error.message || "An unexpected error occurred",
    };
  }
};
