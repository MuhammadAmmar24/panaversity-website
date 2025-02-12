import { CourseActiceSectionsResponse, CourseActiceSectionsResponseSchema } from "@/src/lib/schemas/sections";
import { Result } from "@/src/types/types";

/**
 * A helper function to perform a fetch with retry logic.
 * It retries on network errors or if a 504 error is returned.
 *
 * @param url - The URL to fetch.
 * @param options - The fetch options.
 * @param retries - The maximum number of retry attempts.
 * @param delay - The delay (in ms) before the next retry (will double each attempt).
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
      // For other status codes, throw an error.
      throw new Error(`Failed to fetch: ${response.statusText}`);
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
 * Fetches the active sections for a given course code with a retry mechanism.
 *
 * @param course_code - The course code to fetch active sections for.
 * @returns A Promise that resolves to a Result with the fetched data or an error.
 */
export const getCourseActiceSections = async (
  course_code: string
): Promise<Result<CourseActiceSectionsResponse>> => {
  try {
    const url = `${process.env.ENROLLMENT_API_URL}/data/course/${course_code}/active-sections`;

    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.ENROLLMENT_SECRET}`,
      },
      next: { 
        tags: ["fetchCourseSections"],
        revalidate: 86400, // Revalidate every 24 hours (60 * 60 * 24 seconds)
      },
    };

    // Use our helper function instead of directly calling fetch.
    const response = await fetchWithRetry(url, options);

    const responseData = await response.json();

    // Optional: Validate your response data with your schema if needed.
    // const validationResult = CourseActiceSectionsResponseSchema.safeParse(responseData);
    // if (!validationResult.success) {
    //   const formattedError = JSON.stringify(validationResult.error.format(), null, 2);
    //   console.error('Validation errors:', formattedError);
    //   return {
    //     type: "error",
    //     message: "Data validation failed: " + formattedError,
    //   };
    // }

    return {
      type: "success",
      message: "Course data fetched successfully",
      data: responseData,
    };
  } catch (error: any) {
    console.error("Error fetching course data:", error);
    return {
      type: "error",
      message: error.message || "An unexpected error occurred",
    };
  }
};
