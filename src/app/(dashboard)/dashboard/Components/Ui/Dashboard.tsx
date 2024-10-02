import React, { useState, useEffect } from "react";
import { getEnrolledCourses } from "@/src/actions/dashboard";
import CourseCard from "./CourseCard";
import ClassCard from "./ClassCard";
import UpcomingCard from "./UpcomingClassCard";
import { Course, Class } from "../../types/types";
import {
  mockRecentCourses,
  mockRecentClasses,
  mockUpcomingClasses,
} from "../../types/data";
import { Result } from "@/src/lib/types";
import {CourseEnrollmentResponse } from "@/src/lib/schemas/courses";
import DashboardSkeleton from "../Skeleton/DashboardSkeleton";
import results from "@/src/app/(public)/announcements/page";
import { courseData } from "@/src/constants/courses";

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
  
  const [recentCourses, setRecentCourses] = useState<any>([]);
  const [recentClasses, setRecentClasses] = useState<Class[]>([]);
  const [upcomingClasses, setUpcomingClasses] = useState<Class[]>([]);
const [status, setstatus] = useState(false)
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Simulated mock data for now
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const studentId = 107; // Replace with actual student ID
        const result: Result<CourseEnrollmentResponse> = await getEnrolledCourses(studentId);
        console.log("REWSUTSLSETWS",result)
        

        if (result.type === "error") {
          setError(result.message);
        } else if (result.type === "success" && result.data) {
          // Map the API response to Course type for rendering
          const courses:any = result.data.map((courseData) => ({
            title: courseData.course_name,
            progress: courseData.is_active ? 40 : 100, // Example progress calculation
            lessons: 100, // Replace with actual lesson count if available
            status: courseData.student_course_status, 
            is_paid: courseData.is_paid,
            
          }
          
        ));
          
         setstatus(courses[0].is_paid)

          setRecentCourses(courses);
          
          console.log("STUDENT ENROLLMENT DATA", recentCourses)
          
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
    return <DashboardSkeleton />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Render recent courses */}
      <div className="mb-8 mt-8">
        {recentCourses.map((course:any, index:any) => (
          <CourseCard
            key={index}
            title={course.title}
            progress={course.progress}
            lessons={course.lessons}
            status={course.is_paid}
      
          />
        ))}
      </div>

      {/* Use grid layout for side-by-side alignment */}.
      
      {
         status ? <div></div> : 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Render recent classes */}
        <ClassSection title="Recent Classes" classes={mockRecentClasses} />

        {/* Render upcoming classes */}
        <UpcomingClassSection
          title="Upcoming Classes"
          classes={mockUpcomingClasses}
          />
      </div>
        }
    </div>
  );
};

export default Dashboard;