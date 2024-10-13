"use server";
import { redirect } from "next/navigation";
import * as z from "zod";
import {ResendLinkSchema} from "@/src/schemas/userschema";


export const resendVerification = async (values: z.infer<typeof ResendLinkSchema>) => {
  
  const validatedFields = ResendLinkSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email } = validatedFields.data;
  
  try {
    const response = await fetch(
      `${process.env.BACKEND_AUTH_SERVER_URL}/user/resend-link?email=${email}`,
      {
        // Fixed URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );


    const data = await response.json();
  

    if (response.ok) {
      if (data.message === "No account associated with this email address.") {
        return {  
          error: data.message,
        };
      }
      else if (data.message === "Your account is already verified.") {
        return {  
          success: data.message,
        };
      }
      else if (data.message === "A verification email has been sent to your email address.") {
        return {  
          success: data.message,
        };
      }
    } else if (response.status === 400) {
      return {
        success: false,
        error: "User is already verified",
        redirectTo: "/dashboard",
        action: "Go to Dashboard",
      };
    } 
  } catch (error) {
    return {
      success: false,
      error: "Error during verification",
      redirectTo: "/login",
      action: "Please Login",
    };
  }

};
