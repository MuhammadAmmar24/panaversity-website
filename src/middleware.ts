import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";
import { check_token_expiry } from "./lib/verify_token";
import { refreshAccessToken } from "./actions/refresh_token";

export async function middleware(req: NextRequest) {
  // Define routes
  const protectedRoutes = ["/auth/verification", "/dashboard"];
  const authRoutes = ["/login", "/register"]; // Routes inaccessible when logged in

  // Retrieve tokens from cookies
  const token = req.cookies.get("user_data")?.value || "";
  const parsedToken = token ? JSON.parse(decodeURIComponent(token)) : {};
  const access_token = parsedToken?.access_token;

  const refreshTokenCookie = req.cookies.get("refresh_data")?.value || "";
  const parsedRefreshToken = refreshTokenCookie ? JSON.parse(decodeURIComponent(refreshTokenCookie)) : {};
  const old_refresh_token = parsedRefreshToken?.refresh_token;

  // Check if the current route matches any defined routes
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  // Check if the access token is expired
  const is_token_expired = await check_token_expiry(access_token);

  if (isProtectedRoute) {
    const session = await auth();
    console.log("Protected")

    if (!session) {
      console.log("Session")
      // If no session, redirect to login
      return NextResponse.redirect(new URL("/login", req.url));
    } else if (is_token_expired) {
      console.log("Token Expiry")
      // If the token is expired, attempt to refresh it using the refresh token
      const newTokens = await refreshAccessToken(old_refresh_token);

      if (newTokens.success) {
        console.log("After new tokens")
        // Successfully refreshed the token, allow access to the protected route
        const response = NextResponse.next();

        // Update the access token and refresh token in the response cookies
        // response.cookies.set({
        //   name: "user_data",
        //   value: JSON.stringify(newTokens.access_token),
        //   httpOnly: true,
        //   path: "/",
        //   secure: process.env.NODE_ENV === "production",
        // });

        // response.cookies.set({
        //   name: "refresh_data",
        //   value: JSON.stringify(newTokens.refresh_token),
        //   httpOnly: true,
        //   path: "/",
        //   secure: process.env.NODE_ENV === "production",
        // });

        return response; // Allow access
      } else {
        // Refresh failed, redirect to login
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
  }

  if (isAuthRoute) {
    const session = await auth();
    if (session && !is_token_expired) {
      // If already logged in and token is valid, redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // Allow access to all other routes
  return NextResponse.next();
}
