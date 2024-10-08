import { ProgramCoursesQuery, ProgramCoursesQuerySchema, ProgramCoursesResponse, ProgramCoursesResponseSchema } from "./schemas/courses";
import { Result } from "@/src/lib/types";

export const getProgramCoursesWithOpenRegistration = async (
	query: ProgramCoursesQuery
): Promise<Result<ProgramCoursesResponse>> => {
	const validationResult = ProgramCoursesQuerySchema.safeParse(query);

	if (!validationResult.success) {
		return {
			type: "error",
			message: validationResult.error.errors
				.map((err) => err.message)
				.join(", "),
		};
	}

	try {
		const params = new URLSearchParams();
		for (const [key, value] of Object.entries(validationResult.data)) {
			params.append(key, String(value));
		}

		const response = await fetch(
			`${process.env.ENROLLMENT_API_URL}/data/open/programs/batches/courses?${params}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${process.env.ENROLLMENT_SECRET}`,
				},
				// next: { revalidate: 604800 }, // Revalidate every week (604,800 seconds)
				cache: "force-cache",
			}
		);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch program courses: ${response.statusText}`
			);
		}

		const responseData = await response.json();
		

		const parsedResponse = ProgramCoursesResponseSchema.safeParse(responseData);

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
			message: "Program courses fetched successfully",
			data: parsedResponse.data,
		};
	} catch (error: any) {
		return {
			type: "error",
			message: error.message,
		};
	}
};