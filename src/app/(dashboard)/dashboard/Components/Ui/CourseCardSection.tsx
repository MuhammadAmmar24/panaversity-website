import React from "react";
import CourseCard from "./CourseCard";
import { Course } from "../../types/types";
import {CourseSectionProps} from "../../types/types";
import Link from "next/link";

const CourseSection: React.FC<CourseSectionProps> = ({
  courses,
  enrollmentStatus,
  status,
}) => {
  // if (enrollmentStatus === "not_enrolled") {
  //   return (
  //     <div className="text-center mt-20">
  //       <h1 className="font-medium text-center text-xl md:text-2xl font-poppins ">
  //         Not Enrolled
  //       </h1>
  //       <pre className="text-gray-600">
  //         You are not enrolled in any course. Please enroll in a
  //         course to get started.
  //       </pre>
  //       <Link
  //         className="underline text-accent font-bold text-xl"
  //         href="/programs/flagship-program"
  //       >
  //         Programs
  //       </Link>
  //     </div>
  //   );
  // }

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
        />
      ))}
    </div>
  );
};

export default CourseSection;
