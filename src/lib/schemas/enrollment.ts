import { z } from "zod";

export const EnrollStudentRequestSchema = z.object({
	student_id: z.string(),
	program_id: z.number(),
	batch_id: z.number(),
});

export const EnrollStudentResponseSchema = z.object({
	student_id: z.string(),
	program_id: z.number(),
	batch_id: z.number(),
	id: z.number(),
});

export type EnrollStudentRequest = z.infer<typeof EnrollStudentRequestSchema>;
export type EnrollStudentResponse = z.infer<typeof EnrollStudentResponseSchema>;

const StudentCourseStatusSchema = z.enum([
	"reserved_seat",
	"confirmed",
	"completed",
	"dropped",
]);

export type StudentCourseStatus = z.infer<typeof StudentCourseStatusSchema>;

export const EnrollCourseRequestSchema = z.object({
	student_program_id: z.number(),
	course_batch_program_id: z.number(),
	class_time_slot_id: z.number(),
	lab_time_slot_id: z.number(),
	student_course_status: StudentCourseStatusSchema,
});

export const EnrollCourseResponseSchema = z.object({
	student_program_id: z.number(),
	course_batch_program_id: z.number(),
	class_time_slot_id: z.number(),
	lab_time_slot_id: z.number(),
	student_course_status: StudentCourseStatusSchema,
	id: z.number(),
});

export type EnrollCourseRequest = z.infer<typeof EnrollCourseRequestSchema>;
export type EnrollCourseResponse = z.infer<typeof EnrollCourseResponseSchema>;

export const EnrollNewStudentRequestSchema = z.object({
	student_id: z.string(),
	program_id: z.number(),
	batch_id: z.number(),
	course_batch_program_id: z.number(),
	class_time_slot_id: z.number(),
	lab_time_slot_id: z.number(),
});

export const EnrollNewStudentResponseSchema = z.string();

export type EnrollNewStudentRequest = z.infer<
	typeof EnrollNewStudentRequestSchema
>;
export type EnrollNewStudentResponse = z.infer<
	typeof EnrollNewStudentResponseSchema
>;
