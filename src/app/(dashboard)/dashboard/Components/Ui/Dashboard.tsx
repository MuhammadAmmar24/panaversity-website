import React, { useState, useEffect } from "react";
import { getEnrolledCourses } from "@/src/actions/dashboard";
import { checkUserVerification } from "@/src/actions/profile";
import CourseCard from "./CourseCard";
import ClassCard from "./ClassCard";
import UpcomingCard from "./UpcomingClassCard";
import {
  Course,
  Class,
  ClassSectionProps,
  UpcomingClassSectionProps,
} from "../../types/types";
import { mockRecentClasses, mockUpcomingClasses } from "../../types/data";
import { Result } from "@/src/lib/types";
import { CourseEnrollmentResponse } from "@/src/lib/schemas/courses";
import DashboardSkeleton from "../Skeleton/DashboardSkeleton";

// Section component to render a list of recent classes
const ClassSection: React.FC<ClassSectionProps> = ({ title, classes }) => (
  <div className="flex-1 flex flex-col gap-4">
    <div className="flex justify-start">
      <h1 className="mt-10 font-medium text-start text-xl md:text-2xl font-poppins">
        {title}
      </h1>
    </div>
    {classes.map((cls, index) => (
      <ClassCard
        key={index}
        title={cls.title}
        time={cls.time}
        assignment={cls.assignment}
        lessons={cls.lessons}
      />
    ))}
  </div>
);

// Section component to render a list of upcoming classes
const UpcomingClassSection: React.FC<UpcomingClassSectionProps> = ({
  title,
  classes,
}) => (
  <div className="flex-1 flex flex-col gap-4">
    <div className="flex justify-start">
      <h1 className="mt-10 font-medium text-start text-xl md:text-2xl font-poppins">
        {title}
      </h1>
    </div>
    {classes.map((cls, index) => (
      <UpcomingCard
        key={index}
        title={cls.title ?? "Untitled"}
        time={cls.time}
        date={cls.date}
      />
    ))}
  </div>
);

// Main Dashboard component
const Dashboard: React.FC = () => {
  const [recentCourses, setRecentCourses] = useState<Course[]>([]); // State to hold enrolled courses
  const [recentClasses, setRecentClasses] = useState<Class[]>([]); // State for recent classes (not used currently)
  const [status, setStatus] = useState(false); // State to track paid course status
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [profile, setProfile] = useState<ProfileData | null>(null);

  // Fetch enrolled courses using useEffect hook
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user_data = await checkUserVerification();
        setProfile(user_data); // Set the profile data
        console.log("Profile Data:", user_data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); // Fetch user data once when component mounts

  // Fetch courses after profile data is fetched (depends on profile state)
  useEffect(() => {
    const fetchCourses = async () => {
      if (!profile) return; // Do nothing if profile is not yet fetched

      setLoading(true); // Show loading while fetching data
      setError(null); // Reset any previous errors
      try {
        const studentId = profile.id; // Get the student ID from the profile data
        console.log("Student ID:", studentId);
        const result: Result<CourseEnrollmentResponse> = await getEnrolledCourses(studentId);

        if (result.type === "error") {
          setError(result.message); // Handle error response
        } else if (result.type === "success" && result.data) {
          // Map the API response to a format suitable for rendering
          const courses: Course[] = result.data.map((courseData) => ({
            title: courseData.course_name,
            progress: courseData.is_active ? 40 : 100, // Example progress calculation
            lessons: 100, // Placeholder for lesson count
            status: courseData.student_course_status,
            is_paid: courseData.is_paid, // Adjust payment status if necessary
          }));

          // Set the status for paid courses
          setStatus(courses[0].is_paid || false); // || false is for dev purposes
          setRecentCourses(courses); // Update recent courses state
        }
      } catch (error: any) {
        setError(error.message); // Catch and set any errors
      } finally {
        setLoading(false); // Hide loading once the data is fetched
      }
    };

    // Fetch courses only after profile is fetched
    if (profile) {
      fetchCourses();
    }
  }, [profile]); // Dependency on profile to ensure this effect runs after profile data is available


  if (loading) {
    return <DashboardSkeleton />; // Show loading skeleton while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if any
  }

  return (
    <div className="min-h-screen">
      {/* Render recent courses */}
      <div className="mb-8 mt-8">
        {recentCourses.map((course: any, index: any) => (
          <CourseCard
            key={index}
            title={course.title}
            progress={course.progress}
            lessons={course.lessons}
            status={course.is_paid}
          />
        ))}
      </div>

      {/* Conditionally render recent and upcoming classes if status is true */}
      {status ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <ClassSection title="Recent Classes" classes={mockRecentClasses} />
          <UpcomingClassSection
            title="Upcoming Classes"
            classes={mockUpcomingClasses}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard;
