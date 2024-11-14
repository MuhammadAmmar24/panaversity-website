import fetchProfile from "@/src/lib/getProfile";
import React from "react";
import { Course, CourseSectionProps } from "../../types/types";
import CourseCard from "./CourseCard";

const CourseSection: React.FC<CourseSectionProps> = async ({
  courses,
  status,
}) => {
  const profile: ProfileData = await fetchProfile();

  return (
    <div className="my-14">
      <h1 className="font-medium text-start text-xl md:text-2xl font-poppins mb-4">
        Enrolled Courses
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {courses?.map((course: Course, index: number) => (
          <CourseCard
            key={index}
            title={course.title}
            progress={course.progress}
            classes={course.classes}
            status={status}
            batch_id={course.batch_no}
            student_course_id={course.student_course_id}
            course_batch_program_id={course.course_batch_program_id}
            profile={profile}  
            course_code={course.course_code} // Pass dynamic course code
            start_time={course.start_time} // Pass start time
            day={course.day} // Pass day of the class
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSection;