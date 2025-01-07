import { NextResponse } from "next/server";
import { getCourseInterests } from "@/src/lib/getCourseInterest";
import fetchProfile from "@/src/lib/getProfile";
import { getCourseActiceSections } from "@/src/lib/getActiveSections";
import { getStudentCourses } from "@/src/lib/getStudentCourses";
import { getCoursePrice } from "@/src/lib/coursePrice";
import { getCookie } from "@/src/lib/getCookies";
import { redirect } from "next/dist/server/api-utils";

export async function GET(request: Request) {
  try {
    // Parse query parameters from the URL
    const url = new URL(request.url);
    const courseCode = url.searchParams.get("courseCode");
    const isOfferedNow = url.searchParams.get("isOfferedNow") === "true"; // Convert to boolean

    if (!courseCode) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 },
      );
    }

    const profile = await getCookie();

    // Fetch other API data in parallel
    const [
      coursePriceResult,
      courseInterestsResult,
      sectionsData,
      studentCoursesResult,
    ] = await Promise.all([
      getCoursePrice(courseCode),
      profile ? getCourseInterests(profile.email) : Promise.resolve(null),
      isOfferedNow
        ? getCourseActiceSections(courseCode)
        : Promise.resolve(null),
      isOfferedNow && profile
        ? getStudentCourses(profile.id)
        : Promise.resolve(null),
    ]);

    return NextResponse.json({
      profile,
      courseInterests: courseInterestsResult,
      sections: sectionsData,
      studentCourses: studentCoursesResult,
      coursePrice: coursePriceResult,
    });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
