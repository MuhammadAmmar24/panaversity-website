import fetchProfile from "@/src/lib/getProfile";
import React from "react";
import { Course, CourseSectionProps } from "../../types/types";
import CourseCard from "./CourseCard";

const CourseSection: React.FC<CourseSectionProps> = async ({
  courses,
}) => {
  const profile: ProfileData = await fetchProfile();



  return (
    <div className="my-10 sm:my-14">
      <h1 className="font-poppins mb-4 text-sm font-medium text-textPrimary/90 fold:text-base mobileM:text-xl md:text-3xl">
        Enrolled Courses
      </h1>
      <div className="grid grid-cols-1 tablet_lg:grid-cols-2 gap-8 sm:gap-y-12">
        {courses
          ?.slice()
          .reverse()
          .map((course: Course, index: number) => (
            <CourseCard
              key={index}
              title={course.title}
              progress={course.progress}
              classes={course.classes}
              status={course.status}
              student_course_id={course.student_course_id}
              profile={profile}
              course_code={course.course_code}
              course_section={course.course_section}
              course_price={course.course_price}
       
            />
          ))}
      </div>
    </div>
  );
};

export default CourseSection;
