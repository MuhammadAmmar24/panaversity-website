import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminAuth, auth } from "./auth";
import { check_token_expiry } from "./lib/verify_token";

export async function middleware(req: NextRequest) {
  // Define routes
  const protectedRoutes = ["/auth/verification", "/dashboard"];
  const authRoutes = ["/login", "/register"]; // Routes inaccessible when logged in

  const token = req.cookies.get("user_data")?.value || "";
  const parsedToken = token ? JSON.parse(decodeURIComponent(token)) : {};
  const access_token = parsedToken?.access_token;

  // Check if the current route matches any defined routes
  const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => req.nextUrl.pathname.startsWith(route));
  const is_token_expired = await check_token_expiry(access_token)

  if (isProtectedRoute) {
    console.log("Main Protected Called")
    const session = await auth();
    
    if (!session || is_token_expired) {
      // Not logged in; redirect to login
      console.log("Inside protected to login called")
      return NextResponse.redirect(new URL("/login", req.url));
    }

  }

  if (isAuthRoute) {
    console.log("Main Public Called")
    const session = await auth();
    if (session && !is_token_expired) {
      console.log("Inside public to dashboard called")
      // Already logged in; redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // Allow access to all other routes
  return NextResponse.next();
}