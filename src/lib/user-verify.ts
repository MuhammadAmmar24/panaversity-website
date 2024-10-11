import { auth } from "../auth";
import {check_token_expiry} from '@/src/lib/verify_token'

export const user_verify = async () => {

  const session = await auth(); // Getting JWT From Cookies
  if (!session) {
    
    return { isVerified: false, redirectTo: "/register" };
  }
  else if (session) {

    const token = session?.access_token;
    const is_token_expired = await check_token_expiry(token)
    if(is_token_expired || is_token_expired === null){
      return { isVerified: false, redirectTo: "/login" }
    }
    else {
      return {isVerified: true }
    }
  }
};