"use server";

export const refreshAccessToken = async (old_refresh_token: string) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_AUTH_SERVER_URL}/auth/refresh?old_refresh_token=${old_refresh_token}`,
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
      if (
        response.status === 401 &&
        errorData.detail === "Refresh Token Expired"
      ) {
        return { error: "Refresh Token Expired. Please log in again." };
      }

      throw new Error(
        errorData.message || "An error occurred during token refresh."
      );
    }

    // Extract access and refresh tokens from the response
    const userData = await response.json();
    const expiresInMilliseconds = userData.expires_in * 1000;

    const updatedUserData = {
      ...userData,
      accessTokenExpires: Date.now() + expiresInMilliseconds,
    };

    return {
      access_token: updatedUserData.access_token,
      refresh_token: updatedUserData.refresh_token,
      success: true,
    };
  } catch (error) {
    // Catch any errors during the refresh process
    if (error instanceof Error) {
      return { error: "Token refresh failed!", message: error.message };
    }

    return {
      error: "Token refresh failed!",
      message: "An unexpected error occurred",
    };
  }
};
