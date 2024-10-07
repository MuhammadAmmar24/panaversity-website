import { UpcomingClassSectionProps } from "../../types/types";
import UpcomingCard from "./UpcomingClassCard";

const UpcomingClassSection: React.FC<UpcomingClassSectionProps> = ({
  title,
  classes,
}) => (
  <div className="flex-1 flex flex-col gap-4">
    <div className="flex justify-start">
      <h1 className="mt-10 font-medium text-start text-xl md:text-2xl font-poppins">
        {title}
      </h1>
    </div>
    {classes.map((cls, index) => (
      <UpcomingCard
        key={index}
        title={cls.title ?? "Untitled"}
        time={cls.time}
        date={cls.date}
      />
    ))}
  </div>
);
export default UpcomingClassSection;