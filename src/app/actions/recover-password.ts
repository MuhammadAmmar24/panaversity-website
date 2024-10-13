"use server";
import * as z from "zod";
import { RecoverPasswordSchema } from "@/src/schemas/userschema";

export const resetPassword = async (values: z.infer<typeof RecoverPasswordSchema>) => {
  // Validate the input fields
  const validatedFields = RecoverPasswordSchema.safeParse(values);

  // Return error if validation fails
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email } = validatedFields.data;

  // Send request to backend API to reset password
  try{

    const resetRequest = await fetch(`${process.env.BACKEND_AUTH_SERVER_URL}/auth/reset-password/request?email=${encodeURIComponent(email)}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
      },
      cache: "no-store",
    });
    const res = await resetRequest.json()
  
    console.log(resetRequest.status, resetRequest.statusText);
    console.log(res)
  
    // Handle response and status codes
    if (resetRequest.status === 404) {
      return { error: "User not found with this email" };
  
    } else if (resetRequest.status === 403) {
      return { error: "User is not verified" };
    } else if (resetRequest.status === 200) {
      return { message: "Password reset link sent successfully" };
    }
  }
  catch (error){
    return {error: error}
  }

};
