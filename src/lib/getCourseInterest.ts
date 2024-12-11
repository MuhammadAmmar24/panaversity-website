import { CourseInterestResponse } from "@/src/lib/schemas/courseInterest";

export async function getCourseInterests(user_email: string | undefined) {
  if (!user_email) {
    return {
      type: "error",
      message: "User email is required.",
    };
  }

  // Construct the query parameters correctly
  const params = new URLSearchParams();
  params.append("user_email", String(user_email));

  // Construct the API URL
  const apiUrl = `${process.env.ENROLLMENT_API_URL}/course_interest_tracker/course-interests/?${params}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json", 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.ENROLLMENT_SECRET}`,
      },
      cache: "no-store",
      next: { tags: ["fetchStudentCourseInterests"] },
    });


    if (!response.ok) {
        const errorText = await response.text(); 
        console.error('API Error Response:', errorText);
        return {
          type: "error",
          message: errorText,
        };
      }
    const data: CourseInterestResponse[] = await response.json();


    return {
      type: "success",
      message: "Course interests fetched successfully.",
      data: data,
    };
  } catch (error: any) {
    console.error("Error while fetching course interests:", error);
    return {
      type: "error",
      message: error.message,
    };
  }
}
