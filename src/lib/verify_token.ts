import jwt from "jsonwebtoken";

export async function check_token_expiry(access_token: string) {
  try {
    const decodedToken = jwt.decode(access_token) as { exp: number };

    // Check if the token has expired
    if (decodedToken.exp * 1000 < Date.now()) {
      // Here we can implement the functionality of referesh token
    
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return null;
  }
}
