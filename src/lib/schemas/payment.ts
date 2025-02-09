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
  course_code: z.string(),
  section_no: z.number().min(1),
  package_id: z.number().min(1),
  student_course_id: z.number().min(1),
  student_id: z.string().min(1).max(50),
  student_name: z.string(),
  student_email: z.string(),
  vendor_type: z.string().default("blinq"),
});

// Define the schema for payment history response
export const PaymentHistoryScehma = z.object({
  voucher_id: z.string().nullable(),
  vendor_name: z.string().nullable(),
  payment_amount: z.number().nullable(),
  payment_date: z.string().nullable(),
  payment_currency: z.number().int().nullable(),
  is_paid: z.boolean(),
  course_code: z.string().nullable(),
})


// Define the type for the payment request
export type PaymentRequest = z.infer<typeof PaymentRequestSchema>;

// Define the type for payment history response
export const PaymentHistoryArray = z.array(PaymentHistoryScehma)
export type PaymentHistoryCard = z.infer<typeof PaymentHistoryScehma>;
export type PaymentHistoryResponse = z.infer<typeof PaymentHistoryArray>;
