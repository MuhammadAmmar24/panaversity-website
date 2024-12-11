import { z } from 'zod';

// Schema for the request body
export const update_profile_schema = z.object({
  full_name: z.string(),
  affiliation: z.string(),
});

// Type inferred from the request schema
export type RequestBody = z.infer<typeof update_profile_schema>;

// Schema for the response body
export const update_profile_resp_schema = z.object({
    message: z.string(),
  });
  
  // Type inferred from the response schema
  export type ResponseBody = z.infer<typeof update_profile_resp_schema>;


export type UserProfile =  {
  full_name: string,
  email: string,
  phone: string,
  affiliation: string,
  user_type: string,
  id: string,
  is_verified: boolean,
  student: {
    roll_number: string,
    address: string,
    city: string,
    country: string,
    postal_code: string,
    is_active: boolean,
    user_id: string,
  }
}