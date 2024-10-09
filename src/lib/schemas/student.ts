import { z } from 'zod';

// Schema for the response body of get_profile API
export const get_profile = z.object({
  roll_number: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  is_active: z.boolean(),
  user_id: z.string(),
});

// Type inferred from the response schema
export type GetProfileResponse = z.infer<typeof get_profile>;
