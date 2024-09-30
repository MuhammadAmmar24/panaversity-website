"use server";
import { auth } from "../auth";

export const user_verify = async () => {
  console.log("[session] Verifying user...");
  const session = await auth(); // Getting JWT From Cookies
  if (!session) {
    console.log("[session] No cookies. Redirecting...");
    return { isVerified: false, redirectTo: "/register" };
  }
  console.log("[session] Cookies found. Verifying...");
  const token = session?.access_token;
  try {
    const response = await fetch(`${process.env.BACKEND_AUTH_SERVER_URL}/api/v1/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      cache: "no-cache"
    });

    console.log("RESPONSE", response)

    if (response.ok) {
      const profile = await response.json();
      console.log("VERIFIED", response)
      return { isVerified: profile.is_verified };
      

    } else {
      console.log("NOT VERIFIED", response)
      return { isVerified: false, redirectTo: "/verify" };
    }
  } catch (error) {
    console.log("ERROR", error)
    return { isVerified: false, redirectTo: "/register" };
  }
};