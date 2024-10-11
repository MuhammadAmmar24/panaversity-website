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