"use server";
import { auth } from "../auth";
import {check_token_expiry} from '@/src/lib/verify_token'

export const user_verify = async () => {
  console.log("[session] Verifying user...");
  const session = await auth(); // Getting JWT From Cookies
  if (!session) {
    console.log("[session] No cookies. Redirecting...");
    return { isVerified: false, redirectTo: "/register" };
  }
  else if (session) {
    console.log("[session] Cookies found. Verifying...");
    const token = session?.access_token;
    const is_token_expired = await check_token_expiry(token)
    if(is_token_expired){
      return { isVerified: false, redirectTo: "/login" }
    }
    else {
      return {isVerified: true, redirectTo: "" }
    }
  }
 
  // try {
  //   const response = await fetch(`${process.env.BACKEND_AUTH_SERVER_URL}/api/v1/user/profile`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${token}`,
  //     },
  //     cache: "no-cache"
  //   });

  //   if (response.ok) {
  //     const profile = await response.json();
     
  //     return { isVerified: profile.is_verified };
      

  //   } else {
   
  //     return { isVerified: false, redirectTo: "/verify" };
  //   }
  // } catch (error) {
  //   console.log("ERROR", error)
  //   return { isVerified: false, redirectTo: "/register" };
  // }
};