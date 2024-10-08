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
        // next: {
        //   tags: ["data"],
        // },
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

<<<<<<< HEAD
    // Revalidate the 'data' tag after successful enrollment
    // revalidateTag("data");
    revalidatePath("/dashboard");
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
=======
    revalidateTag("data");
>>>>>>> b4ea553ace7962743eeca0b55b63948805f2a9c8

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