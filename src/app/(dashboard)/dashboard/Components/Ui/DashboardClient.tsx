"use client";
import React, { useState, useEffect } from "react";
import { getEnrolledCourses } from "@/src/actions/dashboard";
import { checkUserVerification } from "@/src/actions/profile";
import DashboardSkeleton from "../Skeleton/DashboardSkeleton";
import ClassSection from "./RecentClassSection";
import UpcomingClassSection from "./UpcomingClassSection";
import CourseSection from "./CourseCardSection";
import { Course } from "../../types/types";
import { Result } from "@/src/lib/types";
import { CourseEnrollmentResponse } from "@/src/lib/schemas/courses";
import { mockRecentClasses, mockUpcomingClasses } from "../../types/data";
import getProfile from "@/src/lib/getProfile";

const DashboardClient: React.FC<any> = ({profileId} : any) => {

  const [recentCourses, setRecentCourses] = useState<Course[]>([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [enrollmentStatus, setEnrollmentStatus] = useState<string | null>(null);


  const data =  getEnrolledCourses(profileId);


  // useEffect(() => {

  //   console.log("Profile ID:", profileId);
  //   const fetchCourses = async () => {
  //     console.log("Profile ID:", profileId);
   

  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const studentId = profileId;
  //       const result: Result<CourseEnrollmentResponse> =
  //         await getEnrolledCourses(studentId);
        
  //       console.log(result)

  //       if (result.type === "error") {
  //         if (result.message.includes("Not Found")) {
  //           setEnrollmentStatus("not_enrolled");
  //         } else {
  //           setError(result.message);
  //         }
  //       } else if (result.type === "success" && result.data) {
  //         if (result.data.length === 0) {
  //           setEnrollmentStatus("not_enrolled");
  //         } else {
  //           const courses: Course[] = result.data.map((courseData) => ({
  //             title: courseData.course_name,
  //             progress: courseData.is_active ? 40 : 100,
  //             lessons: 100,
  //             status: courseData.student_course_status,
  //             is_paid: courseData.is_paid,
  //             batch_no: courseData.batch_id,
  //             student_course_id: courseData.student_course_id,
  //             course_batch_program_id: courseData.course_batch_program_id,
  //           }));

  //           setStatus(courses[0]?.status ?? "inactive");
  //           setRecentCourses(courses);
  //           setEnrollmentStatus("enrolled");
  //         }
  //       }
  //     } catch (error: any) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

 
  //     fetchCourses();
   
  // }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <div>Error: {error}</div>;
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

export default DashboardClient;
