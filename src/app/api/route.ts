import { isValidToken } from "@/src/lib/tokenValidity";
import { NextResponse } from "next/server";

export async function GET() {
  const isValid = await isValidToken();

  return NextResponse.json({
    isAuthenticated: isValid,
  });
}
