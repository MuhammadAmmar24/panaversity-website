// No need for "use client" as it's now a server component

import React from "react";
import { getEnrolledCourses } from "@/src/actions/dashboard";
import DashboardSkeleton from "../Skeleton/DashboardSkeleton";
import ClassSection from "./RecentClassSection";
import UpcomingClassSection from "./UpcomingClassSection";
import CourseSection from "./CourseCardSection";
import { Course } from "../../types/types";
import { Result } from "@/src/lib/types";
import { CourseEnrollmentResponse } from "@/src/lib/schemas/courses";
import { mockRecentClasses, mockUpcomingClasses } from "../../types/data";

interface Props {
  profileId: string;
}

const DashboardServer = async ({ profileId }: Props) => {
  
  let recentCourses: Course[] = [];
  let status = "";
  let enrollmentStatus: string | null = null;

  try {
    const result: Result<CourseEnrollmentResponse> = await getEnrolledCourses(profileId);

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
        recentCourses = result.data.map((courseData) => ({
          title: courseData.course_name,
          progress: courseData.is_active ? 40 : 100,
          lessons: 100,
          status: z,
          is_paid: courseData.is_paid,
          batch_no: courseData.batch_id,
          student_course_id: courseData.student_course_id,
          course_batch_program_id: courseData.course_batch_program_id,
        }));

        status = recentCourses[0]?.status ?? "inactive";
        enrollmentStatus = "enrolled";
      }
    }
  } catch (error: any) {
    return <div>Error: {error.message}</div>;
  }

  if (!recentCourses.length && enrollmentStatus === "not_enrolled") {
    return <div>No courses enrolled.</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Course Section */}
      <CourseSection
        courses={recentCourses}
        enrollmentStatus={enrollmentStatus}
        status={status}
      />

      {/* Class Section */}
      {status === "active" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <ClassSection title="Recent Classes" classes={mockRecentClasses} />
          <UpcomingClassSection
            title="Upcoming Classes"
            classes={mockUpcomingClasses}
          />
        </div>
      )}
    </div>
  );
};

export default DashboardServer;
