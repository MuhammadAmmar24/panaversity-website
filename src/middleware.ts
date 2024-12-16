import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { refreshAccessToken } from "./app/actions/refresh_token";
import { auth } from "./lib/auth";
import { check_token_expiry } from "./lib/verify_token";

export async function middleware(req: NextRequest) {
  // Skip _next and API routes
  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  // Define routes
  const protectedRoutes = ["/dashboard"];
  const authRoutes = [
    "/login",
    "/register",
    "/verify",
    "/verification",
    "/resend-link",
    "/update-password",
  ]; // Routes inaccessible when logged in

  // Check if the current route matches any defined routes
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute || isAuthRoute) {
    // Retrieve tokens from cookies
    const token = req.cookies.get("user_data")?.value || "";
    const parsedToken = token ? JSON.parse(decodeURIComponent(token)) : {};
    const access_token = parsedToken?.access_token;
    const old_refresh_token = parsedToken?.refresh_token;

    // Check session and token validity if accessing protected or auth routes
    const session = await auth();
    const is_token_expired = access_token
      ? await check_token_expiry(access_token)
      : true;

    if (isAuthRoute) {
      // If user is already logged in and tries to access auth route, redirect to dashboard
      if (session && !is_token_expired) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      // Continue to auth route (e.g., login, register) if no token or expired token
      return NextResponse.next();
    }

    if (isProtectedRoute) {
      if (!session) {
        // If no valid session or token, redirect to login
        return NextResponse.redirect(new URL("/login", req.url));
      }

      // If token is expired, attempt to refresh it
      if (is_token_expired) {
        const newTokens = await refreshAccessToken(old_refresh_token);
        console.log("New Tokens", newTokens);
        if (newTokens.success) {
          const { access_token, refresh_token } = newTokens;

          // Set new cookies for access_token and refresh_token
          const response = NextResponse.redirect(
            new URL("/dashboard", req.url)
          );
          response.cookies.set({
            name: "user_data",
            value: JSON.stringify({ access_token, refresh_token }),
            httpOnly: true,
            sameSite:"strict",
            path: "/",
            secure: true,
            
          });

          return response;
        } else {
          // If token refresh fails, redirect to login
          return NextResponse.redirect(new URL("/login", req.url));
        }
      }
    }
  }

  // If no special conditions match, proceed with the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
    "/verify",
    "/verification",
    "/resend-link",
    "/update-password",
  ],
};
