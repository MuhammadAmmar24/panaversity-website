import { z } from "zod";

// Schema for course_info


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
	registration_start_date: z.union([z.string(), z.null()]), // Allow null or string (no strict datetime)
	registration_end_date: z.union([z.string(), z.null()]),   // Allow null
	batch_id: z.number(),
	program_id: z.number(),
	course_batch_program_id: z.number(),
	order: z.number(),
	media_link: z.string(),
});

export const ProgramCoursesResponseSchema = z.object({
	data: z.array(CourseSchema),
	next_last_id: z.number().nullable(),
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
	slot_start_time: z.union([z.string(), z.null()]), // Allow null for datetime
	slot_end_time: z.union([z.string(), z.null()]),   // Allow null for datetime
	total_seats: z.number(),
	booked_seats: z.number(),
	confirmed_seats: z.number(),
	zoom_link: z.union([z.string(), z.null()]), // Allow null for zoom_link
	social_links: z.array(z.string()).nullable().default([]), // Allow null or default to an empty array
	id: z.number(),
	course_batch_program_id: z.number(),
	language: z.string(),
});

export const TimeSlotsResponseSchema = z.object({
	class_time_slots: z.array(TimeSlotSchema),
	lab_time_slots: z.array(TimeSlotSchema),
});

export type TimeSlotsQuery = z.infer<typeof TimeSlotsQuerySchema>;
export type TimeSlot = z.infer<typeof TimeSlotSchema>;
export type TimeSlotsResponse = z.infer<typeof TimeSlotsResponseSchema>;

export const GetCoursePriceParamsSchema = z.object({
	course_batch_program_id: z.number(),
});

export const GetCoursePriceResponseSchema = z.object({
	package_id: z.number(),
	course_batch_program_id: z.number(),
	amount: z.number(),
	currency: z.string(),
});

export type GetCoursePriceParams = z.infer<typeof GetCoursePriceParamsSchema>;
export type GetCoursePriceResponse = z.infer<
	typeof GetCoursePriceResponseSchema
>;



  export const CourseEnrollmentSchema = z.object({
	student_course_id: z.number(),
	course_id: z.number(),
	course_name: z.string(),
	course_order: z.number(),
	is_active: z.boolean(),
	is_paid: z.boolean(),
	student_course_status: z.string(),
	is_graduated: z.boolean(),
	is_registration_open: z.boolean(),
	is_class_started: z.boolean(),
	class_start_date: z.union([z.string(), z.null()]),
	is_class_completed: z.boolean(),
	batch_id: z.number(),
	program_id: z.number(),
	course_batch_program_id: z.number(),
  });
  
  // Define the schema for the entire response (an array of course enrollments)
  export const CourseEnrollmentResponseSchema = z.array(CourseEnrollmentSchema);
  
  // Type definitions
  export type CourseEnrollment = z.infer<typeof CourseEnrollmentSchema>;
  export type CourseEnrollmentResponse = z.infer<typeof CourseEnrollmentResponseSchema>;