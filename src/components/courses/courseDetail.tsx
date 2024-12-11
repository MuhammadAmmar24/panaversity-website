import { getCourseActiceSections } from "@/src/lib/getActiveSections";
import fetchProfile from "@/src/lib/getProfile";
import { getStudentCourses } from "@/src/lib/getStudentCourses";
import { CourseEnrollmentResponse } from "@/src/lib/schemas/courses";
import {
  CourseDetailsProps,
  CourseInfoProps,
  LearnPointProps,
} from "@/src/types/courseEnrollment";
import { Result } from "@/src/types/types";
import { Calendar, Check, Users } from "lucide-react";
import Breadcrumbs from "../ui/Breadcrumbs";
import EnrollmentCard from "./EnrollmentCard";
import CoursePrerequisites from "./PreReqs";
import RatingStars from "./Ratingstar";
import { getCourseInterests } from "@/src/lib/getCourseInterest";

const CourseInfo: React.FC<CourseInfoProps> = ({ icon: Icon, text }) => (
  <div className="flex items-center space-x-2">
    <Icon className="h-5 w-5" />
    <span>{text}</span>
  </div>
);

const LearnPoint: React.FC<LearnPointProps> = ({ point }) => (
  <div className="flex items-start gap-3">
    <div className="rounded-full bg-green-500 p-1">
      <Check className="h-4 w-4 text-white" />
    </div>
    <p className="text-sm font-normal text-textPrimary">{point}</p>
  </div>
);

const CourseDetails: React.FC<CourseDetailsProps> = async ({
  courseData,
  coursePrice,
}) => {
  const {
    course_code,
    course_name,
    course_description,
    course_outcomes,
    long_description,
    is_active,
    is_offered_now,
    program_id,
    pre_requisite,
  } = courseData;

  // Hardcoded Values
  const learnersCount = "20,000+";
  const duration = "3 months";
  const rating = 4.8;
  const ratingCount = 1249;

  let sections: any = [];

  let isEnrolled: boolean = false;

  let student_courses: any = [];

  // Fetch Student Profile  
  const profile: ProfileData = await fetchProfile();

  // Fetch existing course interests
  const student_course_interests = await getCourseInterests(profile.email);

  if (is_offered_now) {
    try {
      // fetch Sectons 
      sections = await getCourseActiceSections(course_code);

      const result: Result<CourseEnrollmentResponse> = await getStudentCourses(
        profile.id,
      );
      student_courses = result.data;
      
      const course = result?.data?.find(
        (course) => course.course_code === course_code,
      );
      
      isEnrolled =
      !!course && course.student_course_status != "expired_reservation";
    } catch (error: any) {
      console.error("Error fetching student courses: ", error.message);
    }
  }

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-teamBg bg-cover bg-center text-white">
        <div className="bg-blur-[1px] backdrop-brightness-75 backdrop-opacity-100">
          {/* Replace the generic container with the same max-width constraints */}
          <div className="mx-auto px-4 sm:px-6 lg:max-w-[990px] lg:px-8 xl:max-w-[1200px]">
            {/* Main content wrapper with fixed padding */}
            <div className="py-4 md:py-10">
              {/* Breadcrumbs */}
              <div className="mb-6">
                <Breadcrumbs
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Programs", href: "/programs" },
                    {
                      label: "Flagship-Program",
                      href: "/programs/flagship-program",
                    },
                    { label: course_name },
                  ]}
                />
              </div>

              {/* Content grid with fixed proportions */}
              <div className="grid grid-cols-1 items-center justify-center gap-y-6 sm:grid-cols-3 md:grid-cols-5 md:justify-between lg:grid-cols-3">
                {/* Course details - takes up 2/3 of space */}
                <div className="space-y-6 pr-0 sm:col-span-3 md:col-span-3 md:pr-4 lg:col-span-2">
                  <div className="space-y-4">
                    <p className="text-md inline-block rounded-full bg-accent/70 px-4 py-1 font-semibold text-white backdrop-blur-3xl">
                      {course_code}
                    </p>

                    <h1 className="font-poppins text-3xl font-bold text-background xs:text-4xl lg:text-5xl">
                      {course_name}
                    </h1>

                    <p className="text-sm font-medium leading-relaxed text-gray-100 sm:text-base">
                      {course_description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 xs:flex-row xs:gap-6">
                    <CourseInfo
                      icon={Users}
                      text={`${learnersCount} Learners`}
                    />
                    <CourseInfo
                      icon={Calendar}
                      text={`Duration: ${duration}`}
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-2xl font-bold">{rating}</span>
                    <RatingStars
                      rating={4.9}
                      color="text-yellow-500"
                      size="w-5 h-5"
                    />
                    <span className="text-sm font-medium text-gray-400">
                      ({ratingCount} ratings)
                    </span>
                  </div>

                  <CoursePrerequisites prerequisites={pre_requisite} />
                </div>

                {/* Price and enrollment - takes up 1/3 of space */}
                <div className="w-full sm:col-span-2 md:col-span-2 md:place-self-center md:self-center lg:col-span-1">
                  <EnrollmentCard
                    is_active={is_active}
                    is_offered_now={is_offered_now}
                    program_id={program_id}
                    profile_id={profile.id}
                    profile_email={profile.email}
                    isEnrolled={isEnrolled}
                    coursePrice={coursePrice}
                    courseName={course_name}
                    courseCode={course_code}
                    pre_requisite={pre_requisite}
                    student_courses={student_courses}
                    student_course_interests={student_course_interests.data || []}
                    sections={sections.data || []}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details Section */}
      <section className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:max-w-[990px] lg:px-8 lg:py-16 xl:max-w-[1200px]">
        <div className="mx-auto flex flex-col items-start justify-start gap-4">
          <h2 className="font-poppins text-3xl font-semibold text-textPrimary md:text-4xl">
            Details
          </h2>
          <div className="w-full text-base font-normal leading-relaxed text-textPrimary/90">
            {long_description.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>

        {/* What You Will Learn */}
        <div className="mt-12 flex flex-col items-start justify-start gap-5 rounded-md bg-gray-300/40 p-6 sm:p-8 md:p-10">
          <h3 className="text-xl font-semibold leading-loose text-textPrimary sm:text-2xl">
            What you will learn in this course
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {course_outcomes.map((point: any, index: any) => (
              <LearnPoint key={index} point={point} />
            ))}
          </div>
        </div>

        {/* Prerequisites */}
        <div className="mt-12">
          <h2 className="font-poppins mb-5 text-3xl font-semibold leading-tight text-textPrimary md:text-4xl">
            Prerequisites
          </h2>
          <div>
            {Array.isArray(pre_requisite) && pre_requisite.length > 0 ? (
              <div className="pl-5">
                <ul className="list-disc space-y-2 pl-5">
                  {pre_requisite.map((pre_req, index) => (
                    <li
                      key={index}
                      className="text-base font-normal leading-relaxed text-textPrimary/90"
                    >
                      {pre_req.course_code} - {pre_req.course_name}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="pl-0 text-base font-normal leading-relaxed text-textPrimary/90">
                There are no pre-requisites for this course.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CourseDetails;
