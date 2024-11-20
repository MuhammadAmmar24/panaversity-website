import { Course } from "@/src/lib/schemas/courses";
import Image from "next/image";
import Link from "next/link";

export const CourseCard = ({ course }: { course: Course }) => (
  <Link
    href={`/programs/flagship-program/${course.course_code}`}
    aria-label={`Go to ${course.course_name} page`}
  >
    <div className="flex h-auto w-full transform flex-col overflow-hidden rounded-xl bg-background pb-0 shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-[2px] hover:shadow-2xl">
      <div className="relative h-[14rem]">
        <Image
          src={course.media_link}
          alt={course.course_name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="object-cover object-top"
        />
      </div>
      <div className="flex min-h-[12rem] flex-col justify-between p-4">
        <div className="space-y-4">
          <div className="mb-2 flex items-center justify-between">
            <h6 className="text-xs font-medium text-gray-700">
              Course Code:{" "}
              <span className="font-bold text-black underline decoration-accent decoration-1 underline-offset-2">
                {course.course_code}
              </span>
            </h6>
            <span
              className={`inline-block rounded-xl px-2 py-1 text-[10px] opacity-75 ${
                course.is_offered_now
                  ? "bg-green-500 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {course.is_offered_now
                ? "Registration Open"
                : "Registration Closed"}
            </span>
          </div>
          <div>
            <h4 className="font-poppins mb-2 text-[1rem] font-medium">
              {course.course_name}
            </h4>
            <p className="line-clamp-3 text-sm">{course.course_description}</p>
          </div>
        </div>
      </div>
    </div>
  </Link>
);
