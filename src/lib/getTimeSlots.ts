import {

	TimeSlotsQuery,
	TimeSlotsQuerySchema,
	TimeSlotsResponse,
	TimeSlotsResponseSchema,
} from "@/src/lib/schemas/courses";
import { Result } from "@/src/lib/types";

export const getTimeSlotsForCourseBatchProgram = async (
	query: TimeSlotsQuery
): Promise<Result<TimeSlotsResponse>> => {
	const validationResult = TimeSlotsQuerySchema.safeParse(query);

	if (!validationResult.success) {
		return {
			type: "error",
			message: validationResult.error.errors
				.map((err) => err.message)
				.join(", "),
		};
	}

	try {
		const params = new URLSearchParams({
			course_batch_program_id: String(
				validationResult.data.course_batch_program_id
			),
		});

		const response = await fetch(
			`${process.env.ENROLLMENT_API_URL}/data/course_batch/timeslots?${params}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${process.env.ENROLLMENT_SECRET}`,
				},
				next: { revalidate: 604800 }, // Revalidate every week (604,800 seconds)
			}
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch time slots: ${response.statusText}`);
		}

		const responseData = await response.json();
  
		// Validate the response data using zod schema
		const parsedResponse = TimeSlotsResponseSchema.safeParse(responseData);

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
			message: "Time slots fetched successfully",
			data: parsedResponse.data,
			
		};
	} catch (error: any) {
		return {
			type: "error",
			message: error.message,
		};
	}
};