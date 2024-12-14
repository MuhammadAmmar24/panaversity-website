// app/api/profile/route.ts
import { NextResponse } from "next/server";
import fetchProfile from "@/src/lib/getProfile";

export async function GET() {
  try {
    const profile = await fetchProfile();

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}
