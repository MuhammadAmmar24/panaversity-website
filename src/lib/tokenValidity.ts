import { cookies } from "next/headers";
import { check_token_expiry } from "./verify_token";

export async function isValidToken(){
    const get_cookies = cookies().get("user_data")?.value;
    if (get_cookies) {
      const access_token= JSON.parse(get_cookies).access_token
      console.log(access_token, "Access Token")
      const isTokenExpired = await check_token_expiry(access_token);
      console.log(isTokenExpired, "isTokenExpired");
      if(isTokenExpired || isTokenExpired === null){ 
      return false
    } else {
      return true
    }
  } else {
    return false
  }
}