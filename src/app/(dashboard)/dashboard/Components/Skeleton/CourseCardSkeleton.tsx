import React from 'react';

 const CourseCardSkeleton: React.FC = () => {
  const icons = Array(5).fill(null); // Changed to 5 to match original component

  return (
    <section className="">
      <div className="relative">
        <article className="bg-white shadow-lg rounded-xl border px-4 sm:px-6 lg:px-8 py-4 md:py-6 flex flex-col gap-4 md:gap-6">
          {/* Course code and action button */}
          <div className="flex justify-between items-center">
            <div className="bg-gray-100 rounded-full h-[18px] sm:h-5 w-32 sm:w-40"></div>
            <div className="bg-gray-100 rounded-full min-h-6 md:min-h-8 min-w-[93px] md:min-w-[125px]"></div>
          </div>

          {/* Course title */}
          <div className="bg-gray-100 rounded-full h-6 md:h-7 w-3/4"></div>

          {/* Progress bar and counter */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex-1 bg-gray-100 rounded-full h-2"></div>
            <div className="bg-gray-100 rounded-full h-[18px] sm:h-5 md:h-7 w-24 sm:w-28 md:w-32"></div>
          </div>

          {/* Icons row */}
          <div className="flex justify-between items-center border-t -mt-2 -mb-2">
            {icons.map((_, index) => (
              <div
                key={index}
                className={`
                  bg-gray-100 rounded-full mt-2
                  ${index === 2 ? 
                    'text-4xl mobileM:text-5xl sm:text-6xl md:text-7xl h-12 w-12 mobileM:h-14 mobileM:w-14 sm:h-16 sm:w-16' : 
                    'text-xl mobileM:text-2xl sm:text-3xl md:text-4xl h-8 w-8 mobileM:h-10 mobileM:w-10 sm:h-12 sm:w-12'
                  }
                `}
              />
            ))}
          </div>

          {/* Date and time row */}
          <div className="flex justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="bg-gray-100 rounded-full h-4 md:h-5 w-4 md:w-5"></div>
              <div className="bg-gray-100 rounded-full h-4 md:h-5 w-16 md:w-20"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-gray-100 rounded-full h-4 md:h-5 w-4 md:w-5"></div>
              <div className="bg-gray-100 rounded-full h-4 md:h-5 w-16 md:w-20"></div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default CourseCardSkeleton;