import { z } from "zod";

export const ProgramsQuerySchema = z.object({
	last_id: z.number().optional(),
	limit: z.number().min(1).max(100).default(10),
});

export const ProgramSchema = z.object({
	program_id: z.number(),
	program_name: z.string(),
	program_description: z.string(),
	batch_name: z.string(),
	batch_description: z.string(),
	is_registration_open: z.boolean(),
	registration_start_date: z.string().datetime(),
	registration_end_date: z.string().datetime(),
	batch_id: z.number(),
});

export const ProgramsResponseSchema = z.object({
	data: z.array(ProgramSchema),
	next_last_id: z.number().optional(),
});

export type ProgramsQuery = z.infer<typeof ProgramsQuerySchema>;
export type Program = z.infer<typeof ProgramSchema>;
export type ProgramsResponse = z.infer<typeof ProgramsResponseSchema>;

export const GetActiveProgramsQuerySchema = z.object({
	student_id: z.string(),
});

export const ActiveProgramSchema = z.object({
	student_id: z.string(),
	program_id: z.number(),
	batch_id: z.number(),
	id: z.number(),
});

export const GetActiveProgramsResponseSchema = z.array(ActiveProgramSchema);

export type GetActiveProgramsQuery = z.infer<
	typeof GetActiveProgramsQuerySchema
>;
export type ActiveProgram = z.infer<typeof ActiveProgramSchema>;
export type GetActiveProgramsResponse = z.infer<
	typeof GetActiveProgramsResponseSchema
>;
