import { NextResponse } from "next/server";
import { refreshAccessToken } from "@/src/app/actions/refresh_token";

export async function POST(req: Request) {
  try {
    const { refresh_token } = await req.json();

    if (!refresh_token) {
      return NextResponse.json(
        { success: false, message: "Refresh token missing" },
        { status: 400 }
      );
    }

    // Attempt to refresh the token
    const newTokens = await refreshAccessToken(refresh_token);
    console.log("New Tokens", newTokens)

    if (newTokens.success) {
      const { access_token, refresh_token: new_refresh_token } = newTokens;

      // Return the new tokens
      return NextResponse.json(
        {
          success: true,
          access_token,
          refresh_token: new_refresh_token,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Token refresh failed" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Error in refresh-token route:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
