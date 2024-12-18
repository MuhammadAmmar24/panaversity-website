import { z } from "zod";

// Schema for the payment object
export const KuickpaySchema = z.object({
  kuickpay_id: z.number(),
  voucher_id: z.number(),
  amount_within_due_date: z.number(),
  amount_after_due_date: z.number(),
  id: z.number(),
  created_at: z.string().datetime(), // ISO timestamp
  updated_at: z.string().datetime(), // ISO timestamp
});

// Define the response type
export type Kuickpay = z.infer<typeof KuickpaySchema>;

// Define the schema for the payment request
export const PaymentRequestSchema = z.object({
  section_no: z.number().min(1),
  package_id: z.number().min(1),
  student_course_id: z.number().min(1),
  student_id: z.string().min(1).max(50),
  student_name: z.string(),
  student_email: z.string(),
  vendor_type: z.string().default("blinq"),
});

// Define the type for the payment request
export type PaymentRequest = z.infer<typeof PaymentRequestSchema>;
