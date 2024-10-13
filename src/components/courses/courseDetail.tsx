import CourseSheet from "./courseSheet";
import { Users, Calendar, Check } from "lucide-react";
import RatingStars from "../ui/Ratingstar";
import fetchProfile from "@/src/lib/getProfile";
import Breadcrumbs from "../Breadcrumbs";

interface CourseInfoProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
}

const CourseInfo: React.FC<CourseInfoProps> = ({ icon: Icon, text }) => (
  <div className="flex items-center space-x-2">
    <Icon className="w-5 h-5" />
    <span>{text}</span>
  </div>
);

interface LearnPointProps {
  point: string;
}

const LearnPoint: React.FC<LearnPointProps> = ({ point }) => (
  <div className="flex gap-3 items-start">
    <div className="bg-green-500 rounded-full p-1">
      <Check className="text-white w-4 h-4" />
    </div>
    <p className="text-sm font-normal text-textPrimary">{point}</p>
  </div>
);

export interface CourseData {
  course_batch_program_id: number;
  is_active: boolean;
  is_registration_open: boolean;
  registration_start_date: string; // ISO date string
  registration_end_date: string; // ISO date string
  course_id: number;
  batch_id: number;
  course_code: string;
  course_name: string;
  course_initials: string;
  course_description: string;
  course_outcomes: string[];
  long_description: string;
  pre_requisite: string[];
  media_link: string;
  program_id: string;
}

interface CourseDetailsClientProps {
  courseData: CourseData;
  initialPrice: number;
  initialCurrency: string;
}

const CourseDetailsClient: React.FC<CourseDetailsClientProps> = async ({
  courseData,
  initialPrice,

  initialCurrency,
}) => {
  const profile: ProfileData = await fetchProfile();

  // Destructure the course data
  const {
    course_name,
    course_description,
    course_outcomes,
    long_description,
    pre_requisite,
    media_link,
    is_registration_open,
    batch_id,
    course_batch_program_id,
    program_id,
  } = courseData;

  // Assign default values if necessary
  const learnersCount = "20,000+";
  const duration = "3 months";
  const rating = 4.8;
  const ratingCount = 1249;

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className=" flex justify-center items-center bg-teamBg bg-cover bg-center text-white">
        <div className="w-full backdrop-brightness-75 backdrop-opacity-100 bg-blur-[1px] min-h-48 sm:min-h-52 md:min-h-72 lg:min-h-[26rem]">
          <div className="lg:max-w-[990px] xl:max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-3">
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

            <div className="flex flex-col md:flex-row md:space-x-8 mt-6">
              {/* Course Details */}
              <div className="w-full md:w-2/3">
                <h1 className="font-bold text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-background font-poppins mb-4">
                  {course_name}
                </h1>
                <p className="mb-5 text-gray-100 text-sm sm:text-base font-medium leading-relaxed max-w-[600px]">
                  {course_description}
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-5 font-medium">
                  <CourseInfo icon={Users} text={`${learnersCount} Learners`} />
                  <CourseInfo icon={Calendar} text={`Duration: ${duration}`} />
                </div>

                <div className="flex flex-wrap items-center space-x-2 mb-6">
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
              <div className="w-full md:w-1/3 mt-5 mb-12 md:mt-0">
                <div className="bg-background text-black p-6 rounded-lg shadow-lg w-full sm:w-auto sm:max-w-sm">
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

                  <CourseSheet
                    is_registration_open={is_registration_open}
                    program_id={program_id}
                    batch_id={batch_id}
                    course_batch_program_id={course_batch_program_id}
                    profile_id={profile?.id}
                  />
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
          <h3 className="text-lg font-semibold text-textPrimary mb-4">
            General Requirements
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {Array.isArray(pre_requisite) ? (
              pre_requisite.map((requirement, index) => (
                <li
                  key={index}
                  className="text-base font-normal leading-relaxed text-textPrimary/90"
                >
                  {requirement}
                </li>
              ))
            ) : (
              <li className="text-base font-normal leading-relaxed text-textPrimary/90">
                No prerequisites available
              </li>
            )}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default CourseDetailsClient;
