import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";
import { check_token_expiry } from "./lib/verify_token";
import { refreshAccessToken } from "./app/actions/refresh_token";

export async function middleware(req: NextRequest) {
  // Define routes
  const protectedRoutes = ["/auth/verification", "/dashboard"];
  const authRoutes = [
    "/login",
    "/register",
    "/verify",
    "/verification",
    "/resend-link",
    "update-password",
  ]; // Routes inaccessible when logged in

  // Retrieve tokens from cookies
  const token = req.cookies.get("user_data")?.value || "";
  const parsedToken = token ? JSON.parse(decodeURIComponent(token)) : {};
  const access_token = parsedToken?.access_token;
  const old_refresh_token = parsedToken?.refresh_token;

  // Check if the current route matches any defined routes
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  // Check if the access token is expired or invalid
  const is_token_expired = await check_token_expiry(access_token);

  // Check session for both protected and auth routes
  const session = await auth();

  // Redirect to dashboard if user is logged in and tries to access login/register routes
  if (isAuthRoute && session && !is_token_expired) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // For protected routes, ensure user is authenticated and token is valid
  if (isProtectedRoute) {
    if (!session) {
      // If no session, redirect to login
      return NextResponse.redirect(new URL("/login", req.url));
    } else if (is_token_expired) {
      // If the token is expired, attempt to refresh it using the refresh token
      const newTokens = await refreshAccessToken(old_refresh_token);

      if (newTokens.success) {
        const { access_token, refresh_token } = newTokens;

        // Set new cookies for access_token and refresh_token
        const response = NextResponse.redirect(new URL("/dashboard", req.url));

        response.cookies.set({
          name: "user_data",
          value: JSON.stringify({ access_token, refresh_token }),
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production",
        });

        return response; // Allow access
      } else {
        // If token refresh fails, redirect to login
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
  }

  // If no special conditions match, proceed with the request
  return NextResponse.next();
}
