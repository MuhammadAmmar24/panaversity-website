import { cookies } from "next/headers";

export async function isValidToken() {
  const isCookies = cookies().get("user_data")?.value;
  if (isCookies) {
    return true;
  } else {
    return false;
  }
}
