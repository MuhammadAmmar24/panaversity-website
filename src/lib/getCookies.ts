import { cookies } from "next/headers";

interface UserData {
  full_name: string;
  id: string;
  email: string;
}

export function getCookie(): UserData | null {
  const cookieValue = cookies().get("user_data")?.value;
  if (!cookieValue) {
      return null;
  }
try {
      const userData: UserData = JSON.parse(cookieValue);
      return userData;
  } catch (error) {
      console.error("Error parsing user_data cookie:", error);
      return null;
  }
}
