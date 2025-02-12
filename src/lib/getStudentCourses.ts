import { CourseEnrollmentResponse } from "@/src/lib/schemas/courses";
import { Result } from "@/src/types/types";

/**
 * A helper function to perform a fetch with retry logic.
 * It retries on network errors or if a 504 error is returned.
 *
 * @param url - The URL to fetch.
 * @param options - The fetch options.
 * @param retries - The maximum number of retry attempts.
 * @param delay - The delay (in ms) before the next retry (doubles each attempt).
 * @returns A Promise resolving to the Response object.
 */
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries: number = 3,
  delay: number = 1000
): Promise<Response> {
  try {
    const response = await fetch(url, options);

    // If response is not OK, check if it's a 504 and we have retries left.
    if (!response.ok) {
      if (response.status === 504 && retries > 0) {
        console.warn(`Received 504 error. Retrying in ${delay}ms... (${retries} attempts left)`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchWithRetry(url, options, retries - 1, delay * 2); // Exponential backoff
      }
      throw new Error(`API Error ${response.status}: ${await response.text()}`);
    }

    return response;
  } catch (error) {
    // If a network error occurs, retry if possible.
    if (retries > 0) {
      console.warn(`Fetch error occurred. Retrying in ${delay}ms... (${retries} attempts left)`, error);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries - 1, delay * 2);
    }
    // If no retries left, rethrow the error.
    throw error;
  }
}

/**
 * Fetches the active courses for a student with a retry mechanism.
 *
 * @param profileId - The student's profile ID.
 * @returns A Promise that resolves to a Result object with enrolled courses or an error.
 */
export const getStudentCourses = async (
  profileId: string
): Promise<Result<CourseEnrollmentResponse>> => {
  try {
    // Validate profileId
    if (!profileId) {
      return { type: "error", message: "Profile Id is required." };
    }

    // Validate environment variables
    const apiUrl = process.env.ENROLLMENT_API_URL;
    const authToken = process.env.ENROLLMENT_SECRET;

    if (!apiUrl || !authToken) {
      console.error("Missing required environment variables.");
      return { type: "error", message: "Internal server error: Missing configuration." };
    }

    // Construct the query parameters
    const params = new URLSearchParams({ student_id: profileId });
    const url = `${apiUrl}/status/status/student-active-courses?${params}`;

    const options: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "force-cache",
      next: { tags: ["fetchStudentCourses"] },
    };

    // Use fetchWithRetry instead of fetch
    const response = await fetchWithRetry(url, options);

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
