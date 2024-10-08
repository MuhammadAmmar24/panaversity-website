import { ClassSectionProps } from "../../types/types";
import ClassCard from "./RecentClassCard";
import Error from "../Error/error_message";

// ClassSection component to render a list of recent classes
const ClassSection: React.FC<ClassSectionProps> = ({ title, classes }) => {

  // Error handling: Ensure title and classes are provided
  if (!title || !classes || !Array.isArray(classes)) {
    console.error(
      "Invalid title or classes array passed to ClassSection component."
    );
    return (
      <div className="text-center">
     <Error message="Error loading classes" />
      </div>
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

      {/* Render list of class cards */}
      {classes.length > 0 ? (
        classes.map((cls, index) => (
          <ClassCard
            key={index}
            title={cls.title}
            time={cls.time}
            assignment={cls.assignment}
            lessons={cls.lessons}
          />
        ))
      ) : (
        <p className="text-gray-500">No classes available.</p> // Message if no classes are found
      )}
    </div>
  );
};

export default ClassSection;
