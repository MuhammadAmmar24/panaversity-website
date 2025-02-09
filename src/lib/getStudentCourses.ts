import {
  CourseEnrollmentResponse
} from "@/src/lib/schemas/courses";
import { Result } from "@/src/types/types";

export const getStudentCourses = async (
  profileId: string,
): Promise<Result<CourseEnrollmentResponse>> => {
  try {

    // Validate profileId
    if (!profileId) {
      return {
        type: "error",
        message: "Profile Id is required.",
      };
    }

    // Vaidate environment variables
    const apiUrl = process.env.ENROLLMENT_API_URL;
    const authToken = process.env.ENROLLMENT_SECRET;

    if (!apiUrl || !authToken) {
      console.error("Missing required environment variables.");
      return {
        type: "error",
        message: "Internal server error: Missing configuration.",
      };
    }
    // Construct the query parameters
    const params = new URLSearchParams({ student_id: profileId });

    // Make the request to the API
    const response = await fetch(`${apiUrl}/status/status/student-active-courses?${params}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "force-cache",
      next: { tags: ["fetchStudentCourses"] },
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    // Parse the JSON response
    const responseData = await response.json();

    return {
      type: "success",
      message: "Enrolled courses fetched successfully",
      data: responseData,
    };
  } catch (error: unknown) {
    console.error("Error fetching enrolled courses:", error);
    return {
      type: "error",
      message: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
