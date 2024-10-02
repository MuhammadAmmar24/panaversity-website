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
  EnrollmentRequestSchema,
  EnrollmentRequest,
  EnrollmentResponseSchema,
  EnrollmentResponse,
} from "@/src/lib/schemas/enrollment";
import { Result } from "@/src/lib/types";
import { revalidateTag } from "next/cache";

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

export const enrollStudentInCourse = async (
  payload: EnrollCourseRequest
): Promise<Result<EnrollCourseResponse>> => {
  const validationResult = EnrollCourseRequestSchema.safeParse(payload);

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
      `${process.env.ENROLLMENT_API_URL}/enrollment/courses/enroll`,
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
      throw new Error(
        `Failed to enroll student in course: ${response.statusText}`
      );
    }

    const responseData = await response.json();

    const parsedResponse = EnrollCourseResponseSchema.safeParse(responseData);

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
      message: "Student enrolled in course successfully",
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
        next: {
          tags: ["data"],
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.ENROLLMENT_SECRET}`,
        },
        body: JSON.stringify(validationResult.data),
      }
    );

    if (response.status !== 201) {
      throw new Error(
        `Failed to enroll student in program and course: ${response.statusText}`
      );
    }

    const responseData = await response.json();

    console.log(responseData);

    // Revalidate the 'data' tag after successful enrollment
    revalidateTag("data");

    // const parsedResponse =
    // 	EnrollNewStudentResponseSchema.safeParse(responseData);

    // if (!parsedResponse.success) {
    // 	return {
    // 		type: "error",
    // 		message: parsedResponse.error.errors
    // 			.map((err) => err.message)
    // 			.join(", "),
    // 	};
    // }

    return {
      type: "success",
      message: "Student enrolled in program and course successfully",
      data: responseData,
    };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message,
    };
  }
};

// Server action to enroll a student in a course
export const enrollStudentInACourse = async (
  enrollmentData: EnrollmentRequest
): Promise<Result<EnrollmentResponse>> => {
  try {
    // Validate enrollment data using the schema
    const validationResult = EnrollmentRequestSchema.safeParse(enrollmentData);

    if (!validationResult.success) {
      return {
        type: "error",
        message: validationResult.error.errors
          .map((err) => err.message)
          .join(", "),
      };
    }

    // Construct the API URL
    const apiUrl = `${process.env.ENROLLMENT_API_URL}/enrollment/courses/enroll`;
    console.log("API URL:", apiUrl);

    // Make the POST request to your enrollment backend
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TOKEN_SECRET}`, // Use secret from environment
      },
      body: JSON.stringify(validationResult.data), // Convert validated data to JSON string
    });

    if (!response.ok) {
      console.log(
        `Failed to enroll student. Status: ${response.status}, StatusText: ${response.statusText}`
      );
      throw new Error(`Failed to enroll student: ${response.statusText}`);
    }

    // Parse the JSON response
    const responseData = await response.json();
    console.log("Enrollment Response:", responseData);

    // Validate the response using the schema
    const parsedResponse = EnrollmentResponseSchema.safeParse(responseData);

    if (!parsedResponse.success) {
      console.log("Schema validation failed:", parsedResponse.error.errors);
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
    console.error("Error enrolling student:", error.message);
    return {
      type: "error",
      message: error.message,
    };
  }
};