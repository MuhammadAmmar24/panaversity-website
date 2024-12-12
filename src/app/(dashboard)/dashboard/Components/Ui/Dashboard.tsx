import CourseSection from "./CourseCardSection";
import { Course, ProfileIdProps } from "../../types/courses";
import { Result } from "@/src/types/types";
import { CourseEnrollmentResponse } from "@/src/lib/schemas/courses";
import Link from "next/link";
import DashboardSkeleton from "../Skeleton/DashboardSkeleton";
import { Suspense } from "react";
import { getStudentCourses } from "@/src/lib/getStudentCourses";
import { getCoursePrice } from "@/src/lib/coursePrice";

const Dashboard = async ({ profileId }: ProfileIdProps) => {
  let recentCourses: Course[] = [];
  let enrollmentStatus: string | null = null;

  try {
    const result: Result<CourseEnrollmentResponse> =
      await getStudentCourses(profileId);

    if (result.type === "error") {
      if (result.message.includes("Not Found")) {
        enrollmentStatus = "not_enrolled";
      } else {
        throw new Error(result.message);
      }
    } else if (result.type === "success" && result.data) {
      if (result.data.length === 0) {
        enrollmentStatus = "not_enrolled";
      } else {
        recentCourses = await Promise.all(
          result.data.map(async (courseData) => {
            const priceResult = await getCoursePrice(courseData.course_code);

            let coursePrice = null;
            if (priceResult.type === "success" && priceResult.data) {
              coursePrice = priceResult.data;
            }

            return {
              title: courseData.course_name,
              progress: courseData.is_active ? 1 : 14, // Mocked progress need to change later
              classes: 14,
              status: courseData.student_course_status,
              is_paid: courseData.is_paid,
              student_course_id: courseData.student_course_id,
              course_id: courseData.course_id,
              course_code: courseData.course_code,
              course_section: courseData.section,
              course_price: coursePrice,
            };
          })
        );
        enrollmentStatus = "enrolled";
      }
    }
  } catch (error: any) {
    return <div>Error: {error.message}</div>;
  }
  if (!recentCourses.length && enrollmentStatus === "not_enrolled") {
    return (
      <div className="flex flex-col justify-center">
        <h1 className="mt-20 text-center font-bold md:text-4xl">
          You are not enrolled in any course.
        </h1>
        <div className="mt-8 flex justify-center">
          <Link
            href={"/programs"}
            className="group relative inline-block items-center justify-start overflow-hidden rounded-full px-3 py-2 font-bold md:px-4 lg:px-5 lg:py-3"
          >
            <span className="absolute left-0 top-0 h-32 w-32 -translate-y-2 translate-x-12 rotate-45 bg-accent opacity-[3%]"></span>
            <span className="absolute left-0 top-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-accent opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8"></span>
            <span className="font-poppins relative w-full text-left text-[0.8rem] font-semibold text-textPrimary transition-colors duration-200 ease-in-out group-hover:text-white lg:text-[0.9rem]">
              Explore Courses
            </span>
            <span className="absolute inset-0 rounded-full border-2 border-accent"></span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <CourseSection
        courses={recentCourses}
        enrollmentStatus={enrollmentStatus}
      />
    </div>
  );
};

const DashboardWithSuspense = ({ profileId }: ProfileIdProps) => (
  <Suspense fallback={<DashboardSkeleton />}>
    <Dashboard profileId={profileId} />
  </Suspense>
);

export default DashboardWithSuspense;
