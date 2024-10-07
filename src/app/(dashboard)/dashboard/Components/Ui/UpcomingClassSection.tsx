import { UpcomingClassSectionProps } from "../../types/types";
import UpcomingCard from "./UpcomingClassCard";
import Error from "../Error/error_message";

// UpcomingClassSection component to render a section with multiple upcoming classes
const UpcomingClassSection: React.FC<UpcomingClassSectionProps> = ({
  title,
  classes,
}) => {
  // Handle the case where `classes` prop is missing or empty
  if (!classes || classes.length === 0) {
    return (
      <Error message="No upcoming classes available" />
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-4">
      {/* Section title */}
      <div className="flex justify-start">
        <h1 className="mt-10 font-medium text-start text-xl md:text-2xl font-poppins">
          {title}
        </h1>
      </div>

      {/* Render upcoming classes */}
      {classes.map((cls, index) => (
        <UpcomingCard
          key={index}
          title={cls.title ?? "Untitled"} // Default to "Untitled" if title is missing
          time={cls.time}
          date={cls.date}
        />
      ))}
    </div>
  );
};

export default UpcomingClassSection;
