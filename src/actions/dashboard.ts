"use server";
import {
    CourseEnrollmentResponseSchema,
    CourseEnrollmentResponse,
} from "@/src/lib/schemas/courses";
import { Result } from "@/src/lib/types";

export const getEnrolledCourses = async (
    studentId: number
): Promise<Result<CourseEnrollmentResponse>> => {
    try {
        // Construct the query parameters correctly
        const params = new URLSearchParams();
        params.append('student_id', String(studentId));

        // Construct the API URL
        const apiUrl = `${process.env.COURSE_API_URL}/status/student-active-courses?${params}`;
        console.log("API URL:", apiUrl);
        console.log("Authorization Token:", process.env.ENROLLMENT_SECRET ? "Exists" : "Missing");

        // Make the request to the API
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${process.env.ENROLLMENT_SECRET}`,
            },
            cache: "no-store",
        });

        // Check if the response is successful
        if (!response.ok) {
            console.log(`Failed to fetch. Status: ${response.status}, StatusText: ${response.statusText}`);
            throw new Error(`Failed to fetch enrolled courses: ${response.statusText}`);
        }

        // Parse the JSON response
        const responseData = await response.json();
        console.log("API Response:", responseData);

        // Validate the response against the schema
        const parsedResponse = CourseEnrollmentResponseSchema.safeParse(responseData);

        if (!parsedResponse.success) {
            console.log("Schema validation failed:", parsedResponse.error.errors);
            return {
                type: "error",
                message: parsedResponse.error.errors.map((err) => err.message).join(", "),
            };
        }

        return {
            type: "success",
            message: "Enrolled courses fetched successfully",
            data: parsedResponse.data,
        };
    } catch (error: any) {
        console.error("Error fetching enrolled courses:", error.message);
        return {
            type: "error",
            message: error.message,
        };
    }
};