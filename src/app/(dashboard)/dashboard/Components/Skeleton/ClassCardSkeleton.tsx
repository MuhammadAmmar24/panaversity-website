import React from "react";

const ClassCardSkeleton: React.FC = () => {
  return (
    <article className="w-full h-full animate-pulse">
      <div className="bg-white shadow-xl rounded-lg flex flex-col items-start md:flex-row md:items-center md:gap-6 px-4 fold:px-2 mobileM:px-4 sm:px-6 lg:px-8 py-4 md:py-5">
        {/* YouTube Icon skeleton */}
        <div className="w-10 h-10 fold:h-8 fold:w-8 mobileM:h-12 mobileM:w-12 sm:h-14 md:h-20 lg:h-14 lg:w-24 bg-gray-200 rounded-lg"></div>
    
        {/* Class details container skeleton */}
        <div className="flex flex-col justify-between gap-1 items-start w-full">
          {/* Class Title skeleton */}
          <div className="h-6 fold:h-4 mobileM:h-5 w-1/2 bg-gray-200 rounded-full mt-1 md:mt-0 mb-2"></div>

          {/* Class metadata skeleton */}
          <div className="w-full border-t pt-2 md:pt-3">
            <div className="h-4 fold:h-3 mobileM:h-4 w-1/3 bg-gray-200 rounded-full mb-2"></div>

            {/* Date and time details skeleton */}
            <div className="flex flex-col sm:flex-row sm:gap-10 text-xs sm:text-sm text-gray-500 pt-1">
              {/* Class date skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-4 fold:h-3 mobileM:h-4 w-20 bg-gray-200 rounded-full"></div>
                <div className="h-4 fold:h-3 mobileM:h-4 w-20 bg-gray-200 rounded-full"></div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ClassCardSkeleton;
