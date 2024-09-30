import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import ClassCard from "./ClassCard";
import UpcomingCard from "./UpcomingClassCard";
import { Course, Class } from "../../types/types";
import {
  mockRecentCourses,
  mockRecentClasses,
  mockUpcomingClasses,
} from "../../types/data";

// Reusable ClassSection for displaying recent classes
interface ClassSectionProps {
  title: string;
  classes: Class[];
}

const ClassSection: React.FC<ClassSectionProps> = ({ title, classes }) => (
  <section className="flex-1 flex flex-col gap-4">
    <header className="flex justify-start">
      <h1 className="mt-10 font-medium text-start text-xl md:text-2xl font-poppins">
        {title}
      </h1>
    </header>
    {classes.map((cls, index) => (
      <ClassCard key={index} title={cls.title} time={cls.time} />
    ))}
  </section>
);

// Reusable UpcomingClassSection for displaying upcoming classes
interface UpcomingClassSectionProps {
  title: string;
  classes: Class[];
}

const UpcomingClassSection: React.FC<UpcomingClassSectionProps> = ({
  title,
  classes,
}) => (
  <section className="flex-1 flex flex-col gap-4">
    <header className="flex justify-start">
      <h1 className="mt-10 font-medium text-start text-xl md:text-2xl font-poppins">
        {title}
      </h1>
    </header>
    {classes.map((cls, index) => (
      <UpcomingCard
        key={index}
        title={cls.title || "Untitled"} // Default to "Untitled" if title is missing
        time={cls.time}
        date={cls.date}
      />
    ))}
  </section>
);

const Dashboard: React.FC = () => {
  // State for storing recent courses, recent classes, and upcoming classes
  const [recentCourses, setRecentCourses] = useState<Course[]>([]);
  const [recentClasses, setRecentClasses] = useState<Class[]>([]);
  const [upcomingClasses, setUpcomingClasses] = useState<Class[]>([]);

  // Simulate fetching mock data on component mount
  useEffect(() => {
    setRecentCourses(mockRecentCourses);
    setRecentClasses(mockRecentClasses);
    setUpcomingClasses(mockUpcomingClasses);
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  return (
    <main className="container mx-auto">
      {/* Render recent courses */}
      <section className="mb-8 mt-8">
        {recentCourses.map((course, index) => (
          <CourseCard
            key={index}
            title={course.title}
            progress={course.progress}
            lessons={course.lessons}
          />
        ))}
      </section>

      {/* Grid layout for aligning classes side by side on larger screens */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Render recent classes */}
        <ClassSection title="Recent Classes" classes={recentClasses} />

        {/* Render upcoming classes */}
        <UpcomingClassSection
          title="Upcoming Classes"
          classes={upcomingClasses}
        />
      </section>
    </main>
  );
};

export default Dashboard;
