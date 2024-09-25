"use client";
import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  Users,
  User,
  Calendar,
  Check,
  LucideIcon,
} from "lucide-react";
import GetEnrolled from "@/src/components/ui/GetEnrolled";
import { Sheet, SheetTrigger, SheetContent } from "@/src/components/ui/sheet";
import Breadcrumb from "../Breadcrumbs";

const learnPoints: string[] = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
];

interface CourseInfoProps {
  icon: LucideIcon;
  text: string;
}

const CourseInfo: React.FC<CourseInfoProps> = ({ icon: Icon, text }) => (
  <div className="flex items-center space-x-2">
    <Icon className="w-5 h-5" />
    <span>{text}</span>
  </div>
);

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className="w-5 h-5 text-yellow-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
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

interface CourseDetailsClientProps {
  initialPrice: number;
  initialCurrency: string;
}

const CourseDetailsClient: React.FC<CourseDetailsClientProps> = ({
  initialPrice,
  initialCurrency,
}) => {
  const [sheetSide, setSheetSide] = useState<"bottom" | "right">("bottom");
  const [price] = useState<number>(initialPrice);
  const [currency] = useState<string>(initialCurrency);

  useEffect(() => {
    const handleResize = () => {
      setSheetSide(window.innerWidth >= 1024 ? "right" : "bottom");
    };

    handleResize(); // Call once on mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="overflow-x-hidden">
      <section className="flex justify-center items-center bg-teamBg bg-cover bg-center text-white">
        <div className="w-full backdrop-brightness-75 backdrop-opacity-100 bg-blur-[1px]">
          <div className="lg:max-w-[990px] xl:max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
          <Breadcrumb
                  program="Flagship-Program"
                  courseName="Gen AI & Cloud Basics"
                />
            <div className="flex flex-col lg:flex-row ">
              
              <div className="w-full lg:w-2/3">
                

                <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-background -mt-2 font-poppins mb-4">
                  GEN AI & CLOUD BASICS
                </h1>
                <p className="mb-5 text-gray-100 text-base font-medium leading-relaxed max-w-[600px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-5 font-medium">
                  <CourseInfo icon={User} text="Instructor: Sarah Johns" />
                  <CourseInfo icon={Users} text="20,000+ Learners" />
                  <CourseInfo icon={Calendar} text="Duration: 3 months" />
                </div>

                <div className="flex flex-wrap items-center space-x-2 mb-6">
                  <span className="text-2xl font-bold">4.8</span>
                  <StarRating rating={4.8} />
                  <span className="text-sm text-gray-400 font-medium">
                    (1,249 ratings)
                  </span>
                  <span className="text-sm text-gray-400 font-medium">
                    2,945 students
                  </span>
                </div>
              </div>

              <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
                <div className="bg-background text-black p-6 rounded-lg shadow-lg lg:shadow-xl max-w-sm sm:max-w-[380px] lg:max-w-full sm:ml-0 mx-auto lg:mx-0">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-900 font-medium text-lg">
                      Price:
                    </span>
                    <span className="text-3xl font-bold uppercase">
                      {`${price} ${currency}`}
                    </span>
                  </div>

                  <Sheet>
                    <SheetTrigger asChild>
                      <button className="w-full bg-accent text-white py-3 rounded-md font-semibold flex items-center justify-center hover:bg-emerald-500 transition duration-300">
                        Enroll Now
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </button>
                    </SheetTrigger>
                    <SheetContent
                      side={sheetSide}
                      className={`w-full max-w-full overflow-y-auto ${
                        sheetSide === "bottom" ? "h-[80vh]" : "h-full"
                      } ${sheetSide === "right" ? "lg:max-w-2xl" : ""}`}
                    >
                      <GetEnrolled />
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lg:max-w-[990px] xl:max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col justify-start items-start gap-4 mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold font-poppins text-textPrimary">
            Details
          </h2>
          <p className="w-full text-base font-normal leading-relaxed text-textPrimary/90">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <div className="bg-gray-300/40 flex flex-col justify-start items-start gap-5 p-6 sm:p-8 md:p-10 rounded-md mt-12">
          <h3 className="text-xl sm:text-2xl font-semibold leading-loose text-textPrimary">
            What you will learn in this course
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learnPoints.map((point, index) => (
              <LearnPoint key={index} point={point} />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl md:text-4xl font-semibold font-poppins leading-tight text-textPrimary mb-5">
            Pre Requisite
          </h2>
          <h3 className="text-lg font-semibold text-textPrimary mb-2">
            General Requirements
          </h3>
          <p className="w-full text-base font-normal leading-relaxed text-textPrimary/90">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </section>
    </main>
  );
};

export default CourseDetailsClient;
