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
	student_id: z.string(),
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
  vendor_type: z.string(),
  package_id: z.number()
  // lab_time_slot_id: z.number(),
});

const StudentProgramSchema = z.object({
	is_dropout: z.boolean(),
	created_at: z.string(), // Temporarily
	dropout_reason: z.string().nullable(),
	updated_at: z.string(), // Temporarily
	dropout_date: z.string().nullable(),
	registration_date: z.string(), // Temporarily
	is_graduated: z.boolean(),
	student_id: z.string(),
	program_id: z.number(),
	graduation_date: z.string().nullable(),
	id: z.number(),
	program_status: z.enum(["active", "completed", "dropped"]),
	created_by: z.string(),
	batch_id: z.number(),
	is_active: z.boolean(),
	updated_by: z.string(),
});

const StudentCourseSchema = z.object({
	created_at: z.string(), // Temporarily
	course_batch_program_id: z.number(),
	class_time_slot_id: z.number(),
	lab_time_slot_id: z.number(),
	student_course_status: StudentCourseStatusSchema,
	is_graduated: z.boolean(),
	created_by: z.string(),
	id: z.number(),
	updated_at: z.string(), // Temporarily
	student_program_id: z.number(),
	student_id: z.string(),
	is_active: z.boolean(),
	is_paid: z.boolean(),
	updated_by: z.string(),
});

export const EnrollNewStudentResponseSchema = z.object({
	student_program: StudentProgramSchema,
	student_course: StudentCourseSchema,
});

export type EnrollNewStudentRequest = z.infer<
	typeof EnrollNewStudentRequestSchema
>;
export type EnrollNewStudentResponse = z.infer<
	typeof EnrollNewStudentResponseSchema
>;
