import { auth } from "./auth";

export const user_verify = async () => {

  const session = await auth(); // Getting JWT From Cookies
  if (!session) {
    
    return { isVerified: false, redirectTo: "/register" };
  }
  else if (session) {
      return { isVerified: true }
    }

};