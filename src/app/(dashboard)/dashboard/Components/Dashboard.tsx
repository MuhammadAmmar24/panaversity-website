import React, { useState, useEffect } from "react";
import { getEnrolledCourses } from "@/src/actions/dashboard";
import CourseCard from "./CourseCard";
import ClassCard from "./ClassCard";
import UpcomingCard from "./UpcomingClassCard";
import { Course, Class } from "../types/types";
import {
  mockRecentCourses,
  mockRecentClasses,
  mockUpcomingClasses,
} from "../types/data";
import { Result } from "@/src/lib/types";
import {CourseEnrollmentResponse } from "@/src/lib/schemas/courses";

// Reusable ClassSection for Recent Classes
interface ClassSectionProps {
  title: string;
  classes: Class[];
}

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

// Reusable UpcomingClassSection for Upcoming Classes
interface UpcomingClassSectionProps {
  title: string;
  classes: Class[];
}

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

const Dashboard: React.FC = () => {
  
  const [recentCourses, setRecentCourses] = useState<Course[]>([]);
  const [recentClasses, setRecentClasses] = useState<Class[]>([]);
  const [upcomingClasses, setUpcomingClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Simulated mock data for now
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const studentId = 1; // Replace with actual student ID
        const result: Result<CourseEnrollmentResponse> = await getEnrolledCourses(studentId);

        if (result.type === "error") {
          setError(result.message);
        } else if (result.type === "success" && result.data) {
          // Map the API response to Course type for rendering
          const courses: Course[] = result.data.map((courseData) => ({
            title: courseData.course_name,
            progress: courseData.is_active ? 100 : 0, // Example progress calculation
            lessons: 0, // Replace with actual lesson count if available
          }));

          setRecentCourses(courses);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Render recent courses */}
      <div className="mb-8 mt-8">
        {recentCourses.map((course, index) => (
          <CourseCard
            key={index}
            title={course.title}
            progress={course.progress}
            lessons={course.lessons}
          />
        ))}
      </div>

      {/* Use grid layout for side-by-side alignment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Render recent classes */}
        <ClassSection title="Recent Classes" classes={recentClasses} />

        {/* Render upcoming classes */}
        <UpcomingClassSection
          title="Upcoming Classes"
          classes={upcomingClasses}
        />
      </div>
    </div>
  );
};

export default Dashboard;