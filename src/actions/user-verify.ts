"use server";
import { auth } from "../auth";

export const user_verify = async () => {
  const session = await auth(); // Getting JWT From Cookies
  if (!session) {
    console.log("[session] No cookies. Redirecting...");
    return { isVerified: false, redirectTo: "/login" };
  }
  const token = session?.access_token;
  try {
    const response = await fetch(`${process.env.BACKEND_AUTH_SERVER_URL}/api/v1/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const profile = await response.json();
    return { isVerified: profile.is_verified };
      

    } else {
      return { isVerified: false, redirectTo: "/verify" };
    }
  } catch (error) {
    return { isVerified: false, redirectTo: "/login" };
  }
};