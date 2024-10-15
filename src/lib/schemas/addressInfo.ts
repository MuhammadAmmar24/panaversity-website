import * as z from "zod";

export const addressSchema = z.object({
    address: z
      .string()
      .min(1, "Address is required")
      .regex(/^[A-Za-z\s]+$/, "Address should only contain letters and spaces"),
    city: z
      .string()
      .min(1, "City is required")
      .regex(/^[A-Za-z\s]+$/, "City should only contain letters and spaces"),
    country: z
      .string()
      .min(1, "Country is required")
      .regex(/^[A-Za-z\s]+$/, "Country should only contain letters and spaces"),
    postalCode: z
      .string()
      .regex(/^\d{5}(-\d{4})?$/, "Postal code should be a 5-digit number, or a 5+4 digit format"),
  });

