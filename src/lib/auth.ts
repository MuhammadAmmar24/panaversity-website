"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function auth() {
  // Check if cookies exist
  const isCookies = (await cookies()).has("user_data");

  if (!isCookies) {
    return null;
  }
  const cookies_user_data = (await cookies()).get("user_data")?.value;

  if (!cookies_user_data) {
    return null;
  }

  let user_data: UserData = JSON.parse(cookies_user_data);

  if (!user_data.access_token) {
    return null;
  }

  return user_data;
}

// Sign Out functionality
export async function signOut() {
  (await cookies()).delete("user_data"); // Deleting the cookie

  // Redirect to login or home page
  redirect("/login"); // You can replace "/login" with the correct path
}
