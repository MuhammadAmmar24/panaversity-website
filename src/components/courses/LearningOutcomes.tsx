import { LearnPointProps } from "@/src/types/courseEnrollment";
import { Check } from "lucide-react";

// Child Component of LearningOutcomes
const LearnPoint: React.FC<LearnPointProps> = ({ point }) => (
  <div className="flex items-start gap-3">
    <div className="rounded-full bg-green-500 p-1">
      <Check className="h-4 w-4 text-white" />
    </div>
    <p className="text-sm font-normal text-textPrimary">{point}</p>
  </div>
);

// Main Component
const LearningOutcomes = ({
  course_outcomes,
  className,
}: {
  course_outcomes: string[];
  className?: string;
}) => {
  return (
    <div
      className={`mt-12 flex flex-col items-start justify-start gap-5 rounded-md bg-gray-300/40 p-6 sm:p-8 md:p-10 ${className}`}
    >
      <h3 className="text-xl font-semibold leading-loose text-textPrimary sm:text-2xl">
        What you will learn in this course
      </h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {course_outcomes.map((point: any, index: any) => (
          <LearnPoint key={index} point={point} />
        ))}
      </div>
    </div>
  );
};

export default LearningOutcomes;
