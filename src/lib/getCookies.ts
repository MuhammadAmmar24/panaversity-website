import { cookies } from "next/headers";

interface UserData {
  full_name: "string";
  id: "string";
  email: "user@example.com";
}

export async function getCookie() {
  const get_cookies = cookies().get("user_data")?.value;
  if (get_cookies) {
    const userData: UserData = JSON.parse(get_cookies).profile;
    return userData;
  } else {
    return null;
  }
}
