import { ClassSectionProps } from "../../types/types";
import ClassCard from "./RecentClassCard";

// Section component to render a list of recent classes
const ClassSection: React.FC<ClassSectionProps> = ({ title, classes }) => (
  <div className="flex-1 flex flex-col gap-4">
    <div className="flex justify-start">
      <h1 className="mt-10 font-medium text-start text-xl md:text-2xl font-poppins">
        {title}
      </h1>
    </div>
    {classes.map((cls, index) => (
      <ClassCard
        key={index}
        title={cls.title}
        time={cls.time}
        assignment={cls.assignment}
        lessons={cls.lessons}
      />
    ))}
  </div>
);
export default ClassSection;