import { z } from "zod";
import { CourseSectionSchema } from "./sections";

// Schema for course_info


export const ProgramCoursesQuerySchema = z.object({
	program_id: z.number(),
	last_id: z.number().optional(),
	limit: z.number().min(1).max(100).default(10),
});

export const CourseSchema = z.object({
	course_id: z.number(),
	course_code: z.string(),
	course_name: z.string(),
	course_description: z.string(),
	is_offered_now: z.boolean(),
	program_id: z.number(),
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
});

export const TimeSlotSchema = z.object({
	time_slot_name: z.string(),
	is_time_slot_active: z.boolean(),
	time_slot_day: z.string(),
	slot_start_time: z.union([z.string(), z.null()]), 
	slot_end_time: z.union([z.string(), z.null()]),   
	zoom_link: z.union([z.string(), z.null()]),      
	github_link: z.union([z.string(), z.null()]),
	lectures_playlist: z.union([z.string(), z.null()]),
	instructor_id: z.number().int(),
	section_id: z.number().int(),
	id: z.number(),
	time_zone: z.string(),
	instructor: z.union([
	  z.string(),
	  z.object({
		instructor_id: z.string(),
		name: z.string(),
		socials: z.array(z.record(z.any())).optional(),
		is_active: z.boolean(),
	  }),
	]),
  });

export const TimeSlotsResponseSchema = z.object({
	class_time_slots: z.array(TimeSlotSchema),
	lab_time_slots: z.array(TimeSlotSchema),
});

export type TimeSlotsQuery = z.infer<typeof TimeSlotsQuerySchema>;
export type TimeSlot = z.infer<typeof TimeSlotSchema>;
export type TimeSlotsResponse = z.infer<typeof TimeSlotsResponseSchema>;



export const GetCoursePriceResponseSchema = z.object({
	package_id: z.number(),
	course_id: z.number(),
	amount: z.number(),
	currency: z.string(),
});

export type GetCoursePriceResponse = z.infer<
	typeof GetCoursePriceResponseSchema
>;



export const CourseEnrollmentSchema = z.object({
	student_course_id: z.number(),
	course_id: z.number(),
	course_name: z.string(),
	course_order: z.number(),
	course_code: z.string(),
	is_active: z.boolean(),
	is_paid: z.boolean(),
	student_course_status: z.string(),
	is_graduated: z.boolean(),
	is_registration_open: z.boolean(),
	class_start_date: z.union([z.string(), z.null()]),
	class_end_date: z.union([z.string(), z.null()]),
	batch_id: z.number(),
	program_id: z.number(),
	section: z.object(CourseSectionSchema.shape).optional(),
  });
  
  // Define the schema for the entire response (an array of course enrollments)
  export const CourseEnrollmentResponseSchema = z.array(CourseEnrollmentSchema);
  
  // Type definitions
  export type CourseEnrollment = z.infer<typeof CourseEnrollmentSchema>;
  export type CourseEnrollmentResponse = z.infer<typeof CourseEnrollmentResponseSchema>;