"use server";

import {
	GetCoursePriceParams,
	GetCoursePriceParamsSchema,
	GetCoursePriceResponse,
	GetCoursePriceResponseSchema,
	ProgramCoursesQuery,
	ProgramCoursesQuerySchema,
	ProgramCoursesResponse,
	ProgramCoursesResponseSchema,
	TimeSlotsQuery,
	TimeSlotsQuerySchema,
	TimeSlotsResponse,
	TimeSlotsResponseSchema,
} from "@/src/lib/schemas/courses";
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
				// cache: "no-store",
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
			`${process.env.ENROLLMENT_API_URL}/enrollment/price/${validationResult.data.course_batch_program_id}`,
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
