import { Pre_req_obj } from "@/src/types/courseEnrollment";
import Link from "next/link";


interface CoursePrerequisitesProps {
  prerequisites?: Pre_req_obj[];
  className?: string;
}

export default function CoursePrerequisites({
  prerequisites = [],
  className = "",
}: CoursePrerequisitesProps) {
  if (!prerequisites || prerequisites.length === 0) {
    return null;
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="text-xl font-bold text-white dark:text-gray-300">
        Prerequisites:
      </span>
      <div
        className="flex flex-wrap gap-2"
        role="list"
        aria-label="Course prerequisites"
      >
        {prerequisites.map((pre_req, index) => (
          <Link
            href={`/programs/flagship-program/${pre_req.course_code}`}
            target="_blank"
            key={index}
            className="inline-flex items-center rounded-md bg-accent px-2.5 py-0.5 text-xs text-white"
          >
            {pre_req.course_code}
          </Link>
        ))}
      </div>
    </div>
  );
}
