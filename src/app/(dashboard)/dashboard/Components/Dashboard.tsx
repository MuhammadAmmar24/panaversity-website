"use client"; // Necessary for Next.js or client-side rendering
import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import ClassCard from "./ClassCard";
import CourseOverview from "./CourseOverview";
import UpcomingCard from "./UpcomingClassCard";
import { Course, Class } from "../utils/types";
import {
  mockRecentCourses,
  mockRecentClasses,
  mockUpcomingClasses,
} from "../utils/data";

const Dashboard: React.FC = () => {
  const [recentCourses, setRecentCourses] = useState<Course[]>([]);
  const [recentClasses, setRecentClasses] = useState<Class[]>([]);
  const [upcomingClasses, setUpcomingClasses] = useState<Class[]>([]);

  // UseEffect to simulate the future use of data fetching (mocking static data)
  useEffect(() => {
    // Simulated mock data for now

    // Setting state with mock data
    setRecentCourses(mockRecentCourses);
    setRecentClasses(mockRecentClasses);
    setUpcomingClasses(mockUpcomingClasses);
  }, []);
  return (
    <div className=" min-h-screen">
      {/* <CourseOverview /> */}
      

        <div>
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
  );
};

export default Dashboard;

// Reusable ClassSection for Recent Classes
// interface ClassSectionProps {
//   title: string;
//   classes: Class[];
// }

// const ClassSection: React.FC<ClassSectionProps> = ({ title, classes }) => (
//   <div className=" flex-1 flex flex-col gap-10">
//     {/* <h1 className="text-xl md:text-2xl">{title}</h1> */}
//     <div className="flex justify-center md:justify-start">
//       <h1 className="text-xl md:text-2xl">Recent Classes</h1>
//     </div>
//     {classes.map((cls, index) => (
//       <ClassCard
//         key={index}
//         title={cls.title}
//         time={cls.time}
//         assignment={cls.assignment}
//         lessons={cls.lessons}
//       />
//     ))}
//   </div>
// );

// Reusable UpcomingClassSection for Upcoming Classes
// interface UpcomingClassSectionProps {
//   title: string;
//   classes: Class[];
// }

// const UpcomingClassSection: React.FC<UpcomingClassSectionProps> = ({
//   title,
//   classes,
// }) => (
//   <div className=" flex-1 flex flex-col gap-10">
//     {/* <h1 className="text-xl md:text-2xl">{title}</h1> */}
//     <div className="flex justify-center md:justify-start">
//       <h1 className="text-xl md:text-2xl mt-10 md:mt-0">Upcoming Classes</h1>
//     </div>
//     {classes.map((cls, index) => (
//       <UpcomingCard
//         key={index}
//         title={cls.title ?? "Untitled"}
//         time={cls.time}
//       />
//     ))}
//   </div>
// );