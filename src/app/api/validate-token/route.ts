// app/api/validate-token/route.ts

import { NextRequest, NextResponse } from "next/server";

import { check_token_expiry } from "@/src/lib/verify_token"; // Adjust the path as needed

export async function GET(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get("cookie");

    if (!cookieHeader) {
      return NextResponse.json({ valid: false });
    }

    // Parse cookies
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((c) => c.split("=")),
    );
    const tokens = cookies["tokens"];

    if (!tokens) {
      return NextResponse.json({ valid: false });
    }

    const parsedCookie = JSON.parse(decodeURIComponent(tokens));
    const access_token = parsedCookie.access_token;

    const isTokenExpired = await check_token_expiry(access_token);

    if (isTokenExpired || isTokenExpired === null) {
      return NextResponse.json({ valid: false });
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    return NextResponse.json({ valid: false });
  }
}
