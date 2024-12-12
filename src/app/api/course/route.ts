// app/api/course-data/route.ts
import { NextResponse } from "next/server";
import { getCourseInterests } from "@/src/lib/getCourseInterest";
import fetchProfile from "@/src/lib/getProfile";
import { getCourseActiceSections } from "@/src/lib/getActiveSections";
import { getStudentCourses } from "@/src/lib/getStudentCourses";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, profileId, courseCode, isOfferedNow } = body;
    console.log(courseCode, "courseCode");


    // Parallel API calls
    const [courseInterestsResult, sectionsData, studentCoursesResult] = await Promise.all([
      getCourseInterests(email),
      isOfferedNow ? getCourseActiceSections(courseCode) : Promise.resolve(null),
      isOfferedNow ? getStudentCourses(profileId) : Promise.resolve(null),
    ]);




    

    return NextResponse.json({
      courseInterests: courseInterestsResult?.data || [],
      sections: sectionsData?.data || [],
      studentCourses: studentCoursesResult?.data || [],
    });

  response.headers.set('Cache-Control', 'no-store');

  } catch (error) {
    console.error("Error in route handler:", error);
    return NextResponse.json(
      { error: "Failed to fetch course data" },
      { status: 500 }
    );
  }
}
