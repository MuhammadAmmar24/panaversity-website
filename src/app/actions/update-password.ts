"use server";
import * as z from "zod";
import { UpdatePasswordSchema } from "@/src/schemas/userschema";

export const updatePassword = async (values: z.infer<typeof UpdatePasswordSchema>) => {
  // Validate the input fields
  const validatedFields = UpdatePasswordSchema.safeParse(values);

  // Return error if validation fails
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { token, new_password } = validatedFields.data;

  try{

    const updatePassword = await fetch(`${process.env.BACKEND_AUTH_SERVER_URL}/auth/reset-password/update?token=${token}&new_password=${new_password}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
      },
      cache: "no-store",
    });
  
    console.log(updatePassword.status, updatePassword.statusText);
  
    // Handle response and status codes
    if (updatePassword.status === 404) {
      return { error: updatePassword.statusText };
  
    } else if (updatePassword.status === 400) {
      return { error: "Invalid or expired password update link" };
    }  else if (updatePassword.status === 403) {
      return { error: "User is not verified" };
    } else if (updatePassword.status === 200) {
      return { message: "Password updated successfully" };
    }
  }
  catch(error){
    return { error: error };
  }

};
