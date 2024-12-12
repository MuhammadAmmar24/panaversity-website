const CourseDescription = ({
  long_description,
  className,
}: {
  long_description: string;
  className?: string;
}) => {
  return (
    <div
      className={`mx-auto flex flex-col items-start justify-start gap-4 ${className}`}
    >
      <h2 className="font-poppins text-3xl font-semibold text-textPrimary md:text-4xl">
        Details
      </h2>
      <div className="w-full text-base font-normal leading-relaxed text-textPrimary/90">
        {long_description.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};


export default CourseDescription