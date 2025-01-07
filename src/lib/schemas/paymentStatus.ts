import { z } from "zod";

//  Fields that Blinq sends
export const BlinqPaymentStatusSchema = z.object({
  vendor: z.literal("blinq"),
  status: z.string(),
  message: z.string(),
  ordId: z.string(),
  paymentcode: z.string(),
  paymentId: z.string(),
  refNumber: z.string(),
  encryptedFormData: z.string(),
  pBank: z.string(),
  amountPaid: z.string(),
  netAmount: z.string(),
  txnFee: z.string(),
  paidOn: z.string(),
  paymentVia: z.string(),
});

// Fields that stripe sends
export const StripePaymentStatusSchema = z.object({
  vendor: z.literal("stripe"),
  //  Yet to be decided
});

/** Use a discriminated union to combine them */
export const PaymentStatusSchema = z.discriminatedUnion("vendor", [
  BlinqPaymentStatusSchema,
  StripePaymentStatusSchema,
]);
