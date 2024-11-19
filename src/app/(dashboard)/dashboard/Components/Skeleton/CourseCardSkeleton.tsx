import React from "react";

const CourseCardSkeleton: React.FC = () => {
  const icons = Array(5).fill(null);

  return (
    <section className="">
      <div className="relative">
        <article className="flex flex-col gap-4 rounded-xl border bg-white px-4 py-4 shadow-lg sm:px-6 md:gap-6 md:py-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="h-[18px] w-32 rounded-full bg-gray-100 sm:h-5 sm:w-40"></div>
            <div className="min-h-6 min-w-[93px] rounded-full bg-gray-100 md:min-h-8 md:min-w-[125px]"></div>
          </div>
          <div className="h-6 w-3/4 rounded-full bg-gray-100 md:h-7"></div>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="h-2 flex-1 rounded-full bg-gray-100"></div>
            <div className="h-[18px] w-24 rounded-full bg-gray-100 sm:h-5 sm:w-28 md:h-7 md:w-32"></div>
          </div>
          <div className="-mb-2 -mt-2 flex items-center justify-between border-t">
            {icons.map((_, index) => (
              <div
                key={index}
                className={`mt-2 rounded-full bg-gray-100 ${
                  index === 2
                    ? "h-12 w-12 text-4xl mobileM:h-14 mobileM:w-14 mobileM:text-5xl sm:h-16 sm:w-16 sm:text-6xl md:text-7xl"
                    : "h-8 w-8 text-xl mobileM:h-10 mobileM:w-10 mobileM:text-2xl sm:h-12 sm:w-12 sm:text-3xl md:text-4xl"
                } `}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-gray-100 md:h-5 md:w-5"></div>
              <div className="h-4 w-16 rounded-full bg-gray-100 md:h-5 md:w-20"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-gray-100 md:h-5 md:w-5"></div>
              <div className="h-4 w-16 rounded-full bg-gray-100 md:h-5 md:w-20"></div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default CourseCardSkeleton;
