import ClassSection from "./RecentClassSection";
import UpcomingClassSection from "./UpcomingClassSection";
import CourseSection from "./CourseCardSection";
import { Course } from "../../types/types";
import { Result } from "@/src/types/types";
import { CourseEnrollmentResponse } from "@/src/lib/schemas/courses";
import { mockRecentClasses, mockUpcomingClasses } from "../../types/data";
import { ProfileIdProps } from "../../types/types";
import Link from "next/link";
import DashboardSkeleton from "../Skeleton/DashboardSkeleton";
import { Suspense } from "react";
import { getStudentCourses } from "@/src/lib/getStudentCourses";
import { courseData } from "@/src/constants/courses";
import { formatTime } from "@/src/lib/timeUtils";

// Server-side component for Dashboard
const Dashboard = async ({ profileId }: ProfileIdProps) => {
  let recentCourses: Course[] = [];
  let status = ""; // Status of the most recent course
  let enrollmentStatus: string | null = null; // Tracks enrollment status

  try {
    // Fetch enrolled courses based on profileId
    const result: Result<CourseEnrollmentResponse> =
      await getStudentCourses(profileId);

    if (result.type === "error") {
      if (result.message.includes("Not Found")) {
        // Handle case where user is not enrolled in any courses
        enrollmentStatus = "not_enrolled";
      } else {
        // Handle any other errors during API call
        throw new Error(result.message);
      }
    } else if (result.type === "success" && result.data) {
      if (result.data.length === 0) {
        // No courses found for the user
        enrollmentStatus = "not_enrolled";
      } else {
        // Map API response data to the Course[] structure
        recentCourses = result.data.map((courseData) => ({
          title: courseData.course_name,
          progress: courseData.is_active ? 1 : 14, // Mocked progress
          classes: 14, // Mocked lessons count
          status: courseData.student_course_status,
          is_paid: courseData.is_paid,
          batch_no: courseData.batch_id,
          student_course_id: courseData.student_course_id,
          course_batch_program_id: courseData.course_batch_program_id,
          course_id: courseData.course_id,
          start_time: formatTime(
            courseData.class_time_slot?.slot_start_time || "",
          ),
          day: courseData.class_time_slot?.time_slot_day || "",
          course_code: courseData.course_code,
        }));
        // status = recentCourses[0]?.status ?? "inactive"; // Set status based on the first course
        enrollmentStatus = "enrolled";
      }
    }
  } catch (error: any) {
    // Handle errors by displaying a user-friendly message
    return <div>Error: {error.message}</div>;
  }

  // Handle case where the user has no enrolled courses
  if (!recentCourses.length && enrollmentStatus === "not_enrolled") {
    return (
      <div className="flex flex-col justify-center">
        <h1 className="mt-20 text-center font-bold md:text-4xl">
          You are not enrolled in any course.
        </h1>
        {/* CTA Button */}
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
      {/* Render Course Section with recent courses */}
      <CourseSection
        courses={recentCourses}
        enrollmentStatus={enrollmentStatus}
        // status={status}
      />

      {/* Render Class Sections only if the user has an active course */}
      {/* {status === "active" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <ClassSection title="Recent Classes" classes={mockRecentClasses} />
          <UpcomingClassSection
            title="Upcoming Classes"
            classes={mockUpcomingClasses}
          />
        </div>
      )} */}
    </div>
  );
};

// Exporting Dashboard wrapped in Suspense
const DashboardWithSuspense = ({ profileId }: ProfileIdProps) => (
  <Suspense fallback={<DashboardSkeleton />}>
    <Dashboard profileId={profileId} />
  </Suspense>
);

export default DashboardWithSuspense;
