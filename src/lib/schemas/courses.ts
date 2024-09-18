import { z } from "zod";

export const ProgramCoursesQuerySchema = z.object({
	program_id: z.number(),
	batch_id: z.number(),
	last_id: z.number().optional(),
	limit: z.number().min(1).max(100).default(10),
});

export const CourseSchema = z.object({
	course_id: z.number(),
	course_name: z.string(),
	course_description: z.string(),
	is_registration_open: z.boolean(),
	registration_start_date: z.string().datetime(),
	registration_end_date: z.string().datetime(),
	batch_id: z.number(),
	program_id: z.number(),
	course_batch_program_id: z.number(),
	order: z.number(),
});

export const ProgramCoursesResponseSchema = z.object({
	data: z.array(CourseSchema),
	next_last_id: z.number().optional(),
});

export type ProgramCoursesQuery = z.infer<typeof ProgramCoursesQuerySchema>;
export type Course = z.infer<typeof CourseSchema>;
export type ProgramCoursesResponse = z.infer<
	typeof ProgramCoursesResponseSchema
>;

export const TimeSlotsQuerySchema = z.object({
	course_batch_program_id: z.number(),
});

export const LanguageSchema = z.object({
	language_name: z.string(),
	is_language_active: z.boolean(),
	created_by: z.string(),
	updated_by: z.string(),
});

export const TimeSlotSchema = z.object({
	time_slot_name: z.string(),
	is_time_slot_active: z.boolean(),
	time_slot_day: z.string(),
	slot_start_time: z.string().datetime(),
	slot_end_time: z.string().datetime(),
	total_seats: z.number(),
	booked_seats: z.number(),
	confirmed_seats: z.number(),
	zoom_link: z.string(),
	social_links: z.array(z.string()),
	id: z.number(),
	course_batch_program_id: z.number(),
	language: LanguageSchema,
});

export const TimeSlotsResponseSchema = z.object({
	class_time_slots: z.array(TimeSlotSchema),
	lab_time_slots: z.array(TimeSlotSchema),
});

export type TimeSlotsQuery = z.infer<typeof TimeSlotsQuerySchema>;
export type TimeSlot = z.infer<typeof TimeSlotSchema>;
export type TimeSlotsResponse = z.infer<typeof TimeSlotsResponseSchema>;
