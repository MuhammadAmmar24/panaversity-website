import { getCoursePrice } from "@/src/lib/coursePrice";
import { getTimeSlotsForCourseBatchProgram } from "@/src/lib/getTimeSlots";
import {
  GetCoursePriceResponse,
  TimeSlotsResponse,
} from "@/src/lib/schemas/courses";
import { getStudentCourses } from "@/src/lib/getStudentCourses";
import fetchProfile from "@/src/lib/getProfile";
import {
  CourseDetailsClientProps,
  CourseInfoProps,
  LearnPointProps,
} from "@/src/types/courseEnrollment";
import { Result } from "@/src/types/types";
import { CourseEnrollmentResponse } from "@/src/lib/schemas/courses";
import { Calendar, Check, Users } from "lucide-react";
import Breadcrumbs from "../ui/Breadcrumbs";
import CourseSheet from "./courseSheet";
import RatingStars from "./Ratingstar";
import { isValidToken } from "@/src/lib/tokenValidity";

const CourseInfo: React.FC<CourseInfoProps> = ({ icon: Icon, text }) => (
  <div className="flex items-center space-x-2">
    <Icon className="w-5 h-5" />
    <span>{text}</span>
  </div>
);

const LearnPoint: React.FC<LearnPointProps> = ({ point }) => (
  <div className="flex gap-3 items-start">
    <div className="bg-green-500 rounded-full p-1">
      <Check className="text-white w-4 h-4" />
    </div>
    <p className="text-sm font-normal text-textPrimary">{point}</p>
  </div>
);

const CourseDetailsClient: React.FC<CourseDetailsClientProps> = async ({
  courseData,
  initialPrice,
  initialCurrency,
}) => {
  // Destructure the course data
  const {
    course_name,
    course_description,
    course_outcomes,
    long_description,
    pre_requisite,
    is_registration_open,
    batch_id,
    course_batch_program_id,
    program_id,
    course_code,
  } = courseData;

  // Assign default values if necessary
  const learnersCount = "20,000+";
  const duration = "3 months";
  const rating = 4.8;
  const ratingCount = 1249;

  // const courseStatus = await enrollmentStatus(course_batch_program_id);
  const timeSlotsResult = await getTimeSlotsForCourseBatchProgram({
    course_batch_program_id,
  });
  const timeSlots: TimeSlotsResponse = timeSlotsResult.data ?? {
    class_time_slots: [],
    lab_time_slots: [],
  };
  const coursePriceResult = await getCoursePrice({ course_batch_program_id });
  const coursePrice: GetCoursePriceResponse = coursePriceResult.data ?? {
    course_batch_program_id: 0,
    package_id: 0,
    amount: 0,
    currency: "",
  };

  const isLoggedIn: boolean = await isValidToken();
  let isEnrolled: boolean =  false;

  let student_courses: any = [];
  const profile: ProfileData = await fetchProfile();

  try {
    const result: Result<CourseEnrollmentResponse> = await getStudentCourses(
      profile.id
    );
    student_courses = result.data;

    const course = result?.data?.find(
      (course) => course.course_batch_program_id === course_batch_program_id
  );
    isEnrolled = !!course && course.student_course_status != 'expired_reservation';

  } catch (error: any) {
    console.error("Error fetching student courses: ", error.message);
  }

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className=" bg-teamBg bg-cover bg-center text-white ">
        <div className="backdrop-brightness-75 backdrop-opacity-100 bg-blur-[1px]">
        <div
          className=" w-full flex flex-col items-start
     min-h-48 sm:min-h-72 lg:min-h-[26rem] lg:max-w-[990px] xl:max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 border-0 border-red-500"
        >
          <div className="  ">
            {/* Breadcrumb Navigation */}
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
          <div className=" flex flex-col justify-between lg:max-w-[990px] xl:max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 border-0 border-blue-500">

            <div className="flex flex-col justify-between gap-y-4 sm:flex-row sm:items-center sm:space-x-4 border-0 border-yellow-500 py-4 lg:pt-4">
              {/* Course Details */}
              <div className="  w-full flex flex-col gap-y-3 lg:gap-y-4 xl:gap-y-5 items-start justify-between sm:w-2/3 border-0 border-green-500">
                <p className=" bg-accent/70 backdrop-blur-3xl px-4  py-1 rounded-full text-md font-semibold text-white">
                  {course_code}
                </p>
                <h1 className="font-bold text-3xl xs:text-4xl sm:text-4xl lg:text-5xl text-background font-poppins ">
                  {course_name}
                </h1>
                <p className=" text-gray-100 text-sm sm:text-base font-medium leading-relaxed max-w-[600px]">
                  {course_description}
                </p>

                <div className="flex flex-col gap-y-1 xs:flex-row xs:space-x-6 items-start font-medium">
                  <CourseInfo icon={Users} text={`${learnersCount} Learners`} />
                  <CourseInfo icon={Calendar} text={`Duration: ${duration}`} />
                </div>

                <div className="flex flex-wrap items-center space-x-2">
                  <span className="text-2xl font-bold">{rating}</span>
                  <RatingStars
                    rating={4.9}
                    color="text-yellow-500"
                    size="w-5 h-5"
                  />
                  <span className="text-sm text-gray-400 font-medium">
                    ({ratingCount} ratings)
                  </span>
                  <span className="text-sm text-gray-400 font-medium">
                    {learnersCount} students
                  </span>
                </div>
              </div>

              {/* Price and Enroll Section */}
              <div className=" max-w-[400px] sm:min-w-[280px] sm:w-1/3 border-0 border-pink-400">
                <div className="bg-background text-black p-6  rounded-lg shadow-lg w-full sm:w-auto sm:max-w-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-900 font-medium text-lg">
                      Price:
                    </span>
                    <span className="text-3xl font-bold uppercase">
                      {initialCurrency
                        ? `${initialCurrency} ${initialPrice}`
                        : initialPrice}
                    </span>
                  </div>

                  {/* Enroll Now Button and Sheet Component  */}
                  <CourseSheet
                    is_registration_open={is_registration_open}
                    program_id={program_id}
                    batch_id={batch_id}
                    course_batch_program_id={course_batch_program_id}
                    profile_id={profile.id}
                    isEnrolled={isEnrolled}
                    timeSlots={timeSlots}
                    coursePrice={coursePrice}
                    courseName={course_name}
                    isLoggedIn={isLoggedIn}
                    pre_requisite={pre_requisite}
                    student_courses={student_courses}
                  />
                </div>
              </div>
            </div>
          </div>
        </div> 
        </div>
      </section>

      {/* Course Details Section */}
      <section className="lg:max-w-[990px] xl:max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col justify-start items-start gap-4 mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold font-poppins text-textPrimary">
            Details
          </h2>
          <p className="w-full text-base font-normal leading-relaxed text-textPrimary/90">
            {long_description}
          </p>
        </div>

        {/* What You Will Learn */}
        <div className="bg-gray-300/40 flex flex-col justify-start items-start gap-5 p-6 sm:p-8 md:p-10 rounded-md mt-12">
          <h3 className="text-xl sm:text-2xl font-semibold leading-loose text-textPrimary">
            What you will learn in this course
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {course_outcomes.map((point: any, index: any) => (
              <LearnPoint key={index} point={point} />
            ))}
          </div>
        </div>

        {/* Prerequisites */}
        <div className="mt-12">
          <h2 className="text-3xl md:text-4xl font-semibold font-poppins leading-tight text-textPrimary mb-5">
            Pre Requisites
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

export default CourseDetailsClient;
