import React from "react";

const CourseCardSkeleton: React.FC = () => {
  return (
    <>
      <section className="md:w-full h-auto   animate-pulse">
        {/* Course card grid container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 fold:gap-2 mobileM:gap-4 sm:gap-6 md:gap-8">
          {/* Individual course card skeleton */}
          <article className="bg-white rounded-lg shadow-xl px-4 fold:px-2 mobileM:px-4 sm:px-6 md:px-8 py-5">
            {/* Icon and action button row skeleton */}
            <div className="flex justify-between items-center mb-6">
              {/* Icon */}
              <div className="bg-gray-200 rounded-full fold:h-8 fold:w-8 mobileM:h-10 mobileM:w-10 h-12 w-12"></div>
              {/* Pay button skeleton */}
              <div className="bg-gray-200 rounded-full fold:h-6 fold:w-16 mobileM:h-7 mobileM:w-20 h-8 w-24"></div>
            </div>

            {/* Course title skeleton */}
            <div className="bg-gray-200 rounded-full fold:h-4 fold:w-1/2 mobileM:h-5 mobileM:w-2/3 h-6 w-1/2 mb-2"></div>

            {/* Progress bar and lesson details skeleton */}
            <div className="flex items-center gap-6 fold:gap-3 mobileM:gap-4">
              {/* Progress bar container skeleton */}
              <div className="flex-1 bg-gray-200 rounded-full fold:h-2 mobileM:h-6 h-4"></div>

              {/* Progress and lessons text skeleton */}
              <div className="bg-gray-200 rounded-full fold:h-3 fold:w-10 mobileM:h-4 mobileM:w-12 h-4 w-16"></div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default CourseCardSkeleton;
