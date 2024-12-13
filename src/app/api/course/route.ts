import { NextResponse } from "next/server";
import { getCourseInterests } from "@/src/lib/getCourseInterest";
import fetchProfile from "@/src/lib/getProfile";
import { getCourseActiceSections } from "@/src/lib/getActiveSections";
import { getStudentCourses } from "@/src/lib/getStudentCourses";

export async function GET(request: Request) {
  try {
    // Parse query parameters from the URL
    const url = new URL(request.url);
    const email = url.searchParams.get("email");
    const profileId = url.searchParams.get("profileId");
    const courseCode = url.searchParams.get("courseCode");
    const isOfferedNow = url.searchParams.get("isOfferedNow") === "true"; // Convert to boolean

    if (!email || !profileId || !courseCode) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    console.log("API Call")

    // Parallel API calls
    const [courseInterestsResult, sectionsData, studentCoursesResult] = await Promise.all([
      getCourseInterests(email),
      isOfferedNow ? getCourseActiceSections(courseCode) : Promise.resolve(null),
      isOfferedNow ? getStudentCourses(profileId) : Promise.resolve(null),
    ]);

    return NextResponse.json({
      courseInterestsResult,
      sectionsData,
      studentCoursesResult,
    });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
