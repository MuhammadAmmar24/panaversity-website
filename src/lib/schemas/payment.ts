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
