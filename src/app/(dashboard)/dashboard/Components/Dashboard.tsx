"use client"
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

  useEffect(() => {
    // Mock data (unchanged)
    const mockRecentCourses = [
      { title: "Gen AI & Cloud Services", progress: 40, lessons: 10 },
      { title: "Applied Generative AI", progress: 20, lessons: 20 },
    ];

    const mockRecentClasses = [
      { title: "Gen AI & Cloud Services", time: "2:00 PM", assignment: "14", lessons: "10" },
      { title: "Applied Generative AI", time: "3:00 PM", assignment: "15", lessons: "12" },
    ];

    const mockUpcomingClasses = [
      { title: "Gen AI & Cloud Services", time: "4:00 PM" },
      { title: "Applied Generative AI", time: "5:00 PM" },
    ];

    setRecentCourses(mockRecentCourses);
    setRecentClasses(mockRecentClasses);
    setUpcomingClasses(mockUpcomingClasses);
  }, []);

  return (
    <div className="p-6 min-h-screen mb-28 max-w-7xl mx-auto">
      <CourseOverview />

      <Section title="Recent Enrolled Courses">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentCourses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              progress={course.progress}
              lessons={course.lessons}
            />
          ))}
        </div>
      </Section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <Section title="Recent Classes">
          {recentClasses.map((cls, index) => (
            <ClassCard
              key={index}
              title={cls.title}
              time={cls.time}
              assignment={cls.assignment}
              lessons={cls.lessons}
            />
          ))}
        </Section>

        <Section title="Upcoming Classes">
          {upcomingClasses.map((cls, index) => (
            <UpcomingCard key={index} title={cls.title} time={cls.time} />
          ))}
        </Section>
      </div>
    </div>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div className="w-full mb-6">
    <h2 className="text-xl md:text-2xl mb-4">{title}</h2>
    <div className="space-y-4">{children}</div>
  </div>
);

export default Dashboard;