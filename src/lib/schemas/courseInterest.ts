import { z } from "zod";

export const CourseInterestSchema = z.object({
  id: z.number().optional(),
  user_preferences: z.object({}).optional(),
  user_id: z.string(),
  user_email: z.string().email(),
  course_code: z.string(),
  interest_type: z.enum(["wait_list", "wish_list", "info_request"]), 
  notes: z.string().optional(),
});

export type EnrollNewStudentRequest = z.infer<typeof CourseInterestSchema>;

export interface CourseInterestResponse {
    user_id: string;
    user_email: string;
    course_code: string;
    interest_type: string;
    notes: string | null;
    id: number;
    user_preferences: Record<string, unknown> | null;
}