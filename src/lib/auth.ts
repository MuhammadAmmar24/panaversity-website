"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function auth() {
  // Check if cookies exist
  const isCookies = cookies().has("tokens");

  if (!isCookies) {
    return null;
  }
  const cookies_user_data = cookies().get("tokens")?.value;

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
  cookies().delete("tokens"); // Deleting the cookie
  cookies().delete("user_data")

  // Redirect to login or home page
  redirect("/login"); // You can replace "/login" with the correct path
}
