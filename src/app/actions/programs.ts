"use server";

import {
	GetActiveProgramsQuery,
	GetActiveProgramsQuerySchema,
	GetActiveProgramsResponse,
	GetActiveProgramsResponseSchema,
	ProgramsQuery,
	ProgramsQuerySchema,
	ProgramsResponse,
	ProgramsResponseSchema,
} from "@/src/lib/schemas/programs";
import { Result } from "@/src/lib/types";

export const getProgramsWithOpenRegistration = async (
	query: ProgramsQuery
): Promise<Result<ProgramsResponse>> => {
	const validationResult = ProgramsQuerySchema.safeParse(query);

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
			`${process.env.ENROLLMENT_API_URL}/data/open/programs/?${params}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${process.env.ENROLLMENT_SECRET}`,
				},
			}
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch programs: ${response.statusText}`);
		}

		const responseData = await response.json();

		const parsedResponse = ProgramsResponseSchema.safeParse(responseData);

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
			message: "Programs fetched successfully",
			data: parsedResponse.data,
		};
	} catch (error: any) {
		return {
			type: "error",
			message: error.message,
		};
	}
};

export const getActiveProgramsForStudent = async (
	query: GetActiveProgramsQuery
): Promise<Result<GetActiveProgramsResponse>> => {
	const validationResult = GetActiveProgramsQuerySchema.safeParse(query);

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
			student_id: validationResult.data.student_id,
		});

		const response = await fetch(
			`${process.env.ENROLLMENT_API_URL}/status/status?${params}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${process.env.ENROLLMENT_SECRET}`,
				},
			}
		);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch active programs: ${response.statusText}`
			);
		}

		const responseData = await response.json();

		const parsedResponse =
			GetActiveProgramsResponseSchema.safeParse(responseData);

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
			message: "Active programs fetched successfully",
			data: parsedResponse.data,
		};
	} catch (error: any) {
		return {
			type: "error",
			message: error.message,
		};
	}
};
