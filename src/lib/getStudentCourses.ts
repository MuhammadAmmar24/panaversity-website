import {
    CourseEnrollmentResponse,
    CourseEnrollmentResponseSchema,
} from "@/src/lib/schemas/courses";
import { Result } from "@/src/types/types";

export const getStudentCourses = async (
    studentId: string | undefined
): Promise<Result<CourseEnrollmentResponse>> => {
    try {
        // Construct the query parameters correctly
        const params = new URLSearchParams();
        params.append('student_id', String(studentId));

        const paramstest = "12345"

        // Construct the API URL
        const apiUrl = `${process.env.ENROLLMENT_API_URL}/status/status/student-active-courses?student_id=${paramstest}`;


        // Make the request to the API
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${process.env.ENROLLMENT_SECRET}`,
            },
            cache:'no-store'
        });


        // Check if the response is successful
        if (!response.ok) {

            throw new Error(`Failed to fetch enrolled courses: ${response.statusText}`);
        }

        // Parse the JSON response
        const responseData = await response.json();



        // Validate the response against the schema
        // const parsedResponse = CourseEnrollmentResponseSchema.safeParse(responseData);



        // if (!parsedResponse.success) {

        //     return {
        //         type: "error",
        //         message: parsedResponse.error.errors.map((err) => err.message).join(", "),
        //     };
        // }

        return {
            type: "success",
            message: "Enrolled courses fetched successfully",
            data: responseData,
        };
    } catch (error: any) {
        console.error("Error fetching enrolled courses:", error.message);
        return {
            type: "error",
            message: error.message,
        };
    }
};