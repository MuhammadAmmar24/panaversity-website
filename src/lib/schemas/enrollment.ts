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
  section_id: z.number(),
  package_id: z.number(),
  course_id: z.number(),
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

export interface EnrollResponse {
  status: string;
  student_course: {
    student_program_id: number;
    course_batch_program_id: number;
    student_id: string;
    class_time_slot_id: number;
    lab_time_slot_id: number | null;
    student_course_status:
      | "reserved_seat"
      | "active"
      | "expired_reservation"
      | "passed"
      | "failed"
      | "suspension"; // Add other possible statuses here
    id: number;
    created_at: string; // ISO string
    updated_at: string; // ISO string
  };
  fee_voucher: {
    voucher: {
      payment_date: string | null;
      voucher_create_date: string; // ISO string
      batch_no: number;
      payment_provider: string | null;
      payment_currency: string | null;
      updated_at: string; // ISO string
      is_valid: boolean;
      id: number;
      is_paid: boolean;
      payment_amount: number;
      created_at: string; // ISO string
      student_course_id: number;
      package_id: number;
      last_date: string; // ISO string
      vendor_id: number;
      voucher_id: string;
      student_id: string;
    };
    kuickpay: unknown | null;
    stripe: {
      amount_after_due_date: number;
      stripe_transaction_id: string;
      voucher_id: number;
      amount_within_due_date: number;
      url_expiration_date: string; // ISO string
      id: number;
      updated_at: string; // ISO string
      stripe_id: number;
      payment_intent_id: string | null;
      stripe_url: string;
      created_at: string; // ISO string
    } | null;
  };
}
