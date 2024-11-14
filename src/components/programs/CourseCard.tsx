import { Course } from "@/src/lib/schemas/courses";
import Image from "next/image";
import Link from "next/link";

export const CourseCard = ({ course }: { course: Course }) => (
  <Link href={`/programs/flagship-program/${course.course_id}`} aria-label={`Go to ${course.course_name} page`}>
    <div className="flex flex-col bg-background rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:-translate-y-[2px] w-full h-auto pb-0">
      <div className="h-[14rem] relative">
        <Image
          src={course.media_link}
          alt={course.course_name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="object-top object-cover"
        />
      </div>
      <div className="flex flex-col justify-between p-4 min-h-[12rem]">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h6 className="text-xs font-medium text-gray-700 ">
              Course Code: <span className="font-bold underline underline-offset-2 text-black decoration-accent decoration-1">{course.course_code}</span>
            </h6>
            <span
              className={`text-[10px] opacity-75 rounded-xl px-2 py-1 inline-block
                ${
                  course.is_registration_open
                    ? "bg-green-500 text-white"
                    : "bg-gray-700 text-white"
                }`}
            >
              {course.is_registration_open
                ? "Registration Open"
                : "Registration Closed"}
            </span>
          </div>
          <div>
            <h4 className="font-medium text-[1rem] font-poppins  mb-2">
              {course.course_name}
            </h4>
            <p className="text-sm line-clamp-3">{course.course_description}</p>
          </div>
        </div>
      </div>
    </div>
  </Link>
);
