"use server";
import { auth } from "../auth";

export const checkUserVerification = async () => {
  const session = await auth(); // Getting JWT From Cookies
  if (!session) {

    return { isVerified: false, redirectTo: "/login" };
  }
  const token = session.access_token;
  try {
    const response = await fetch(`${process.env.BACKEND_AUTH_SERVER_URL}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      cache: "force-cache",

    });
    if (response.ok) {
      const profile = await response.json();


      // return { isVerified: profile.is_verified, redirectTo: profile.is_verified ? "/programs/flagship-program" : "/verify" };
      return profile;
    } else {
      return { isVerified: false, redirectTo: "/login" };
    }
  } catch (error) {
    return { isVerified: false, redirectTo: "/login" };
  }
};