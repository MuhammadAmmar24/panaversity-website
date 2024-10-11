import React from "react";
import CourseCard from "./CourseCard";
import { Course } from "../../types/types";
import {CourseSectionProps} from "../../types/types";
import fetchProfile from "@/src/lib/getProfile";

const CourseSection: React.FC<CourseSectionProps> = async ({
  courses,
  status,
}) => {

  const profile: ProfileData = await fetchProfile();


  return (
    <div className="mb-8 mt-8">
      {courses?.map((course: Course, index: number) => (
        <CourseCard
          key={index}
          title={course.title}
          progress={course.progress}
          lessons={course.lessons}
          status={status}
          batch_id={course.batch_no}
          student_course_id={course.student_course_id}
          course_batch_program_id={course.course_batch_program_id}
          profile={profile}
        />
      ))}
    </div>
  );
};

export default CourseSection;
