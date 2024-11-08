import { decodeJwt } from "jose";

export async function check_token_expiry(access_token: string) {
  try {
    // Decode the JWT payload without verifying
    const payload = decodeJwt(access_token);

    // Check if 'exp' exists and return it
    if (payload.exp !== undefined) {
      if(payload.exp * 1000 < Date.now()){
        return true
      }
      else {
        return false
      }

    } else {
      return null;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

