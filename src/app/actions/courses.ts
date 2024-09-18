"use server";

import {
	ProgramCoursesQuery,
	ProgramCoursesQuerySchema,
	ProgramCoursesResponse,
	ProgramCoursesResponseSchema,
	TimeSlotsQuery,
	TimeSlotsQuerySchema,
	TimeSlotsResponse,
	TimeSlotsResponseSchema,
} from "@/lib/schemas/courses";
import { Result } from "@/lib/types";

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

		// TODO: Add Authorization header
		const response = await fetch(
			`/api/v1/data/open/programs/batches/courses?${params}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
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

		// TODO: Add Authorization header
		const response = await fetch(
			`/api/v1/data/course_batch/timeslots?${params}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
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
