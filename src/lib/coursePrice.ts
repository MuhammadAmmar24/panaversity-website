import { GetCoursePriceParams, GetCoursePriceParamsSchema, GetCoursePriceResponse, GetCoursePriceResponseSchema } from "./schemas/courses";
import { Result } from "@/src/lib/types";

export const getCoursePrice = async (
	params: GetCoursePriceParams
): Promise<Result<GetCoursePriceResponse>> => {
	// Validate the path parameters using zod schema
	const validationResult = GetCoursePriceParamsSchema.safeParse(params);
	

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
			`${process.env.ENROLLMENT_API_URL}/enrollment/price/${params.course_batch_program_id}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${process.env.ENROLLMENT_SECRET}`,
				},
				// next: { revalidate: 604800 }, // Revalidate every week (604,800 seconds)
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