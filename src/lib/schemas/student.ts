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


// Schema for the request body to update student profile
export const updateProfileSchema = z.object({
  address: z.string(),
  city: z.string(),
  country: z.string(),
  postal_code: z.string(),
  is_active: z.boolean(),
});

// Type inferred from the request schema
export type update_st_profile_Request = z.infer<typeof updateProfileSchema>;

// Schema for the response body after updating student profile
export const updateProfileResponseSchema = z.object({
  message: z.string(),
});

// Type inferred from the response schema
export type update_st_profile_Response = z.infer<typeof updateProfileResponseSchema>;
