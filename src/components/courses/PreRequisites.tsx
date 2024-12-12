const PrerequisitesSection = ({
  className,
  pre_requisite,
}: {
  className?: string;
  pre_requisite: any[];
}) => {
  return (
    <div className={`mt-12 ${className}`}>
      <h2 className="font-poppins mb-5 text-3xl font-semibold leading-tight text-textPrimary md:text-4xl">
        Prerequisites
      </h2>
      <div>
        {Array.isArray(pre_requisite) && pre_requisite.length > 0 ? (
          <div className="pl-5">
            <ul className="list-disc space-y-2 pl-5">
              {pre_requisite.map((pre_req, index) => (
                <li
                  key={index}
                  className="text-base font-normal leading-relaxed text-textPrimary/90"
                >
                  {pre_req.course_code} - {pre_req.course_name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="pl-0 text-base font-normal leading-relaxed text-textPrimary/90">
            There are no pre-requisites for this course.
          </p>
        )}
      </div>
    </div>
  );
};

export default PrerequisitesSection;
