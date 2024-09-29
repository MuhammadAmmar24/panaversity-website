import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import ClassCard from "./ClassCard";
import UpcomingCard from "./UpcomingClassCard";
import { Course, Class } from "../utils/types";
import {
  mockRecentCourses,
  mockRecentClasses,
  mockUpcomingClasses,
} from "../utils/data";

// Reusable ClassSection for Recent Classes
interface ClassSectionProps {
  title: string;
  classes: Class[];
}

const ClassSection: React.FC<ClassSectionProps> = ({ title, classes }) => (
  <div className="flex-1 flex flex-col gap-10">
    <div className="flex justify-center md:justify-start">
      <h1 className="mt-10 text-center font-medium text-xl md:text-2xl lg:text-3xl font-poppins">
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
  <div className="flex-1 flex flex-col gap-10">
    <div className="flex justify-center md:justify-start">
      <h1 className="mt-10 text-center font-medium text-xl md:text-2xl lg:text-3xl font-poppins">
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

  // Simulated mock data for now
  useEffect(() => {
    setRecentCourses(mockRecentCourses);
    setRecentClasses(mockRecentClasses);
    setUpcomingClasses(mockUpcomingClasses);
  }, []);

  return (
    <div className="min-h-screen p-8">
      {/* Render recent courses */}
      <div className="mb-8">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
