import { NextResponse } from "next/server";
import { getCourseInterests } from "@/src/lib/getCourseInterest";
import fetchProfile from "@/src/lib/getProfile";
import { getCourseActiceSections } from "@/src/lib/getActiveSections";
import { getStudentCourses } from "@/src/lib/getStudentCourses";

export async function GET(request: Request) {
  try {
    // Parse query parameters from the URL
    const url = new URL(request.url);
    const courseCode = url.searchParams.get("courseCode");
    const isOfferedNow = url.searchParams.get("isOfferedNow") === "true"; // Convert to boolean

    if (!courseCode) {

      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    // Fetch profile first
    const profile = await fetchProfile();


    // Fetch other API data in parallel
    const [courseInterestsResult, sectionsData, studentCoursesResult] = await Promise.all([
      getCourseInterests(profile.email),
      isOfferedNow ? getCourseActiceSections(courseCode) : Promise.resolve(null),
      isOfferedNow ? getStudentCourses(profile.id) : Promise.resolve(null),
    ]);

    return NextResponse.json({
      profile,
      courseInterests: courseInterestsResult,
      sections: sectionsData,
      studentCourses: studentCoursesResult,
    });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
