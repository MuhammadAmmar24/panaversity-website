"use client"; // Necessary for Next.js or client-side rendering
import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import ClassCard from "./ClassCard";
import CourseOverview from "./CourseOverview";
import UpcomingCard from "./UpcomingClassCard";

interface Course {
  title: string;
  progress: number;
  lessons: number;
}

interface Class {
  title: string;
  time: string;
  assignment?: string;
  lessons?: string;
}

const Dashboard: React.FC = () => {
  const [recentCourses, setRecentCourses] = useState<Course[]>([]);
  const [recentClasses, setRecentClasses] = useState<Class[]>([]);
  const [upcomingClasses, setUpcomingClasses] = useState<Class[]>([]);

  // UseEffect to simulate the future use of data fetching (mocking static data)
  useEffect(() => {
    // Simulated mock data for now
    const mockRecentCourses = [
      { title: "Gen AI & Cloud Services", progress: 40, lessons: 10 },
      { title: "Applied Generative AI", progress: 20, lessons: 20 },
    ];

    const mockRecentClasses = [
      {
        title: "Gen AI & Cloud Services",
        time: "2:00 PM",
        assignment: "14",
        lessons: "10",
      },
      {
        title: "Applied Generative AI",
        time: "3:00 PM",
        assignment: "15",
        lessons: "12",
      },
    ];

    const mockUpcomingClasses = [
      { title: "Gen AI & Cloud Services", time: "4:00 PM" },
      { title: "Applied Generative AI", time: "5:00 PM" },
    ];

    // Setting state with mock data
    setRecentCourses(mockRecentCourses);
    setRecentClasses(mockRecentClasses);
    setUpcomingClasses(mockUpcomingClasses);
  }, []);

  return (
    <div className="p-6 min-h-screen mb-28">
      <CourseOverview />

      {/* Recent Enrolled Courses */}
      <div className="flex justify-center md:justify-start md:ml-32 w-full">
        <h1 className="text-xl md:text-2xl mb-6 md:ml-16">
          Recent Enrolled Courses
        </h1>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col w-3/4 justify-center items-center gap-6 md:gap-4 md:grid grid-cols-2">
          {recentCourses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              progress={course.progress}
              lessons={course.lessons}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center md:flex md:flex-row">
        {/* Recent Classes */}
        <ClassSection title="Recent Classes" classes={recentClasses} />

        {/* Upcoming Classes */}
        <UpcomingClassSection
          title="Upcoming Classes"
          classes={upcomingClasses}
        />
      </div>
    </div>
  );
};

export default Dashboard;

// Reusable ClassSection for Recent Classes
interface ClassSectionProps {
  title: string;
  classes: Class[];
}

const ClassSection: React.FC<ClassSectionProps> = ({ title, classes }) => (
  <div className="flex flex-col items-center mt-10 gap-6 md:w-full lg:w-1/2 px-4">
    <h1 className="text-xl md:text-2xl mt-14">{title}</h1>
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
  <div className="flex flex-col items-center mt-10 gap-6 md:w-full lg:w-1/2 px-4">
    <h1 className="text-xl md:text-2xl mt-14">{title}</h1>
    {classes.map((cls, index) => (
      <UpcomingCard key={index} title={cls.title} time={cls.time} />
    ))}
  </div>
);
