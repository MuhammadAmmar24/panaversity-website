import React from "react";

const CourseCardSkeleton: React.FC = () => {
  const icons = Array(5).fill(null);

  return (
    <section className="relative">
      <div className="flex flex-col gap-4 md:gap-6 shadow-lg rounded-2xl border overflow-hidden">
        <div className="px-4 py-4 sm:px-6 md:py-6 lg:px-8 flex flex-col justify-center gap-4 border-b bg-gray-100">
          <div className="flex items-center justify-between">
            <div className="h-[18px] w-32 rounded-full bg-gray-200 sm:h-5 sm:w-40"></div>
            <div className="min-h-6 min-w-[93px] rounded-full bg-gray-200 md:min-h-8 md:min-w-[125px]"></div>
          </div>
          <div className="h-6 w-3/4 rounded-full bg-gray-200 md:h-7"></div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 flex flex-col justify-center gap-4">
          <div className="flex justify-between items-center">
            <div className="h-4 w-20 rounded-full bg-gray-200 sm:h-5 sm:w-24"></div>
            <div className="h-4 w-20 rounded-full bg-gray-200 sm:h-5 sm:w-24"></div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="h-2 w-full rounded-full bg-gray-200"></div>
            <div className="h-4 w-20 rounded-full bg-gray-200 sm:h-5 sm:w-24"></div>
          </div>

          <div className="flex flex-col gap-2 sm:mt-4">
            <div className="flex justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-gray-200"></div>
                <div className="h-4 w-16 rounded-full bg-gray-200"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-gray-200"></div>
                <div className="h-4 w-16 rounded-full bg-gray-200"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-gray-200"></div>
                <div className="h-4 w-16 rounded-full bg-gray-200"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-gray-200"></div>
                <div className="h-4 w-16 rounded-full bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-1 sm:py-3 flex items-center justify-between border-t bg-gray-100">
          {icons.map((_, index) => (
            <div
              key={index}
              className={`group relative h-2 w-2 mobileM:h-7 mobileM:w-7 md:h-8 md:w-8 rounded-full bg-gray-200`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCardSkeleton;
