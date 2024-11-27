import { CourseActiceSectionsResponse, CourseActiceSectionsResponseSchema } from "@/src/lib/schemas/sections";
import { Result } from "@/src/types/types";

export const getCourseActiceSections = async (
  course_code: string
): Promise<Result<CourseActiceSectionsResponse>> => {
  try {
    const response = await fetch(
      `${process.env.ENROLLMENT_API_URL}/data/course/${course_code}/active-sections`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.ENROLLMENT_SECRET}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch course data: ${response.statusText}`);
    }

    const responseData = await response.json();
    
    // Validate the response data against our schema
    // const validationResult = CourseActiceSectionsResponseSchema.safeParse(responseData);

    // if (!validationResult.success) {
    //   // Create a more detailed error message
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
    console.error('Error fetching course data:', error);
    
    return {
      type: "error",
      message: error.message || 'An unexpected error occurred',
    };
  }
}