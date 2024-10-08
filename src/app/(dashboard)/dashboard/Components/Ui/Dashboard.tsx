import { getEnrolledCourses } from "@/src/actions/dashboard";
import ClassSection from "./RecentClassSection";
import UpcomingClassSection from "./UpcomingClassSection";
import CourseSection from "./CourseCardSection";
import { Course } from "../../types/types";
import { Result } from "@/src/lib/types";
import { CourseEnrollmentResponse } from "@/src/lib/schemas/courses";
import { mockRecentClasses, mockUpcomingClasses } from "../../types/data";
import { ProfileIdProps } from "../../types/types";

// Server-side component for Dashboard
const Dashboard = async ({ profileId }: ProfileIdProps) => {
  let recentCourses: Course[] = [];
  let status = ""; // Status of the most recent course
  let enrollmentStatus: string | null = null; // Tracks enrollment status

  try {
    // Fetch enrolled courses based on profileId
    const result: Result<CourseEnrollmentResponse> = await getEnrolledCourses(
      profileId
    );

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
          progress: courseData.is_active ? 40 : 100, // Mocked progress
          lessons: 100, // Mocked lessons count
          status: courseData.student_course_status,
          is_paid: courseData.is_paid,
          batch_no: courseData.batch_id,
          student_course_id: courseData.student_course_id,
          course_batch_program_id: courseData.course_batch_program_id,
        }));

        status = recentCourses[0]?.status ?? "inactive"; // Set status based on the first course
        enrollmentStatus = "enrolled";
      }
    }
  } catch (error: any) {
    // Handle errors by displaying a user-friendly message
    return <div>Error: {error.message}</div>;
  }

  // Handle case where the user has no enrolled courses
  if (!recentCourses.length && enrollmentStatus === "not_enrolled") {
    return <div>No courses enrolled.</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Render Course Section with recent courses */}
      <CourseSection
        courses={recentCourses}
        enrollmentStatus={enrollmentStatus}
        status={status}
      />

      {/* Render Class Sections only if the user has an active course */}
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

export default Dashboard;
