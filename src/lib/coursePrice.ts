import {  GetCoursePriceResponse, GetCoursePriceResponseSchema } from "./schemas/courses";
import { Result } from "@/src/types/types";

export const getCoursePrice = async (
	course_code: string
): Promise<Result<GetCoursePriceResponse>> => {


	try {
		const response = await fetch(
			`${process.env.ENROLLMENT_API_URL}/enrollment/price/${course_code}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${process.env.ENROLLMENT_SECRET}`,
				},
                cache:'force-cache'
			}
		);


		if (!response.ok) {
			throw new Error(`Failed to fetch course price: ${response.statusText}`);
		}

		const responseData = await response.json();


		// Validate the response data using zod schema
		const parsedResponse = GetCoursePriceResponseSchema.safeParse(responseData);

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
			message: "Course price fetched successfully",
			data: parsedResponse.data,
		};
	} catch (error: any) {
		return {
			type: "error",
			message: error.message,
		};
	}
};