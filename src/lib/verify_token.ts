// import jwt from "jsonwebtoken";

// export async function check_token_expiry(access_token: string) {
//   try {
//     const decodedToken = jwt.decode(access_token) as { exp: number };

//     // Check if the token has expired
//     if (decodedToken.exp * 1000 < Date.now()) {
//       console.log("verify_token");
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     return null;
//   }
// }


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

