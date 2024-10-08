// "use server";

// import * as z from "zod";
// import { cookies } from "next/headers";
// import { LoginSchema } from "@/src/schemas/userschema";
// import { checkUserVerification } from "./profile";
// import { revalidateTag } from "next/cache";


// export const refreshAccessToken = async (
//   old_refresh_token:string
// ) => {
  
//   try {
  
//     const response = await fetch(`${process.env.BACKEND_AUTH_SERVER_URL}/api/v1/auth/refresh?old_refresh_token=${old_refresh_token}`, {
//       method: "POST",
//       cache: "no-store",
//       headers: {
//         "Content-Type": "application/json"
//       },
    
//     });



//     if (!response.ok) {
//       const errorData = await response.json();

//       if (response.status === 401) {
//         if (errorData.detail === "Refresh Token Expired") {
//           return false;
//         } 
//       }
//       throw new Error(errorData.message || "An error occurred during authentication");
//     }

//     // const userData = await response.json();
//     // const updatedUserData = {
//     //   ...userData,
//     //   accessTokenExpires: Date.now() + expiresInMilliseconds,
//     // };
//     // Include the token expiration time in seconds and milliseconds
//     // const expiresInMilliseconds = userData.expires_in * 1000;
    
//     const {access_token, refresh_token} = await response.json()
//     console.log("Access Token", access_token)
//     console.log("Refresh Token", refresh_token)

//     cookies().set({
//       name: "user_data",
//       value: JSON.stringify(access_token),
//       httpOnly: true,
//     },
//   );

//     cookies().set({
//       name: "refresh_data",
//       value: JSON.stringify(refresh_token),
//       httpOnly: true,
//     });
//     return { success: "Authenticated!"};
//   } catch (error) {
//     if (error instanceof Error) {
//       return { error: "Authentication failed!", message: error.message };
//     }
//     return { error: "Authentication failed!", message: "An unexpected error occurred" };
//   }
// };

"use server";

import { cookies } from "next/headers";

export const refreshAccessToken = async (old_refresh_token: string) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_AUTH_SERVER_URL}/api/v1/auth/refresh?old_refresh_token=${old_refresh_token}`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();

      // Handle specific error cases, such as expired refresh token
      if (response.status === 401 && errorData.detail === "Refresh Token Expired") {
        return { error: "Refresh Token Expired. Please log in again." };
      }

      throw new Error(errorData.message || "An error occurred during token refresh.");
    }

    // Extract access and refresh tokens from the response
    const { access_token, refresh_token } = await response.json();
    console.log("new access", access_token)

    // Set the new access token in cookies
    cookies().set({
      name: "user_data",
      value: JSON.stringify(access_token),
      httpOnly: true,
      path: "/", // Ensure the cookie is accessible throughout the application
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    });

    // Set the new refresh token in cookies
    cookies().set({
      name: "refresh_data",
      value: JSON.stringify(refresh_token),
      httpOnly: true,
      path: "/", // Same path for refresh token
      secure: process.env.NODE_ENV === "production",
    });

    return { success: true, access_token, refresh_token };
  } catch (error) {
    // Catch any errors during the refresh process
    if (error instanceof Error) {
      return { error: "Token refresh failed!", message: error.message };
    }

    return { error: "Token refresh failed!", message: "An unexpected error occurred" };
  }
};
