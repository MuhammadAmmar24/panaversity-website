import { getCourseActiceSections } from "@/src/lib/getActiveSections";
import { getCourseInterests } from "@/src/lib/getCourseInterest";
import fetchProfile from "@/src/lib/getProfile";
import { getStudentCourses } from "@/src/lib/getStudentCourses";
import { CourseEnrollmentResponse } from "@/src/lib/schemas/courses";
import {
  CourseDetailsProps,
  CourseInfoProps,
} from "@/src/types/courseEnrollment";
import { Result } from "@/src/types/types";
import { Calendar, Users } from "lucide-react";
import { Suspense } from "react";
import Breadcrumbs from "../ui/Breadcrumbs";
import ScheduleCardSkeleton from "../ui/skeletons/EnrollmentCardSkeleton";
import CourseDescription from "./CourseDescription";
import EnrollmentCard from "./EnrollmentCard";
import LearningOutcomes from "./LearningOutcomes";
import CoursePrerequisites from "./PreReqs";
import PrerequisitesSection from "./PreRequisites";
import RatingStars from "./Ratingstar";
import CourseHeroSkeleton from "../ui/skeletons/CourseHeroSkeleton";

const CourseInfo: React.FC<CourseInfoProps> = ({ icon: Icon, text }) => (
  <div className="flex items-center space-x-2">
    <Icon className="h-5 w-5" />
    <span>{text}</span>
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

  // const student_course_interests = await getCourseInterests(profile.email);

  // Fetch existing course interests

  // if (is_offered_now) {
  //   try {
  //     // fetch Sectons
  //     sections = await getCourseActiceSections(course_code);

  //     const result: Result<CourseEnrollmentResponse> = await getStudentCourses(
  //       profile.id,
  //     );
  //     student_courses = result.data;

  //     const course = result?.data?.find(
  //       (course) => course.course_code === course_code,
  //     );

  //     isEnrolled =
  //       !!course && course.student_course_status != "expired_reservation";
  //   } catch (error: any) {
  //     console.error("Error fetching student courses: ", error.message);
  //   }
  // }

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}

      {/* <Suspense fallback={<CourseHeroSkeleton />}> */}
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
                {/* <Suspense fallback={<ScheduleCardSkeleton />}> */}
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
                    student_course_interests={[]}
                    sections={sections.data || []}
                  />
                </div>
                {/* </Suspense> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* </Suspense> */}

      {/* Course Details Section */}
      <section className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:max-w-[990px] lg:px-8 lg:py-16 xl:max-w-[1200px]">
        {/* Course Description */}
        <CourseDescription long_description={long_description} />

        {/* What You Will Learn */}
        <LearningOutcomes course_outcomes={course_outcomes} />

        {/* Prerequisites */}
        <PrerequisitesSection pre_requisite={pre_requisite} />
      </section>
    </main>
  );
};

export default CourseDetails;
