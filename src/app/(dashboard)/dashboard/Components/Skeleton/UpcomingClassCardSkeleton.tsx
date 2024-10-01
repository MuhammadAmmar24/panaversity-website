import React from "react";

const UpcomingCardSkeleton: React.FC = () => {
  return (
    <article className="w-full h-full animate-pulse">
      <div className="bg-white rounded-lg shadow-xl flex flex-col justify-between gap-4 px-4 fold:px-2 mobileM:px-4 sm:px-6 md:px-8 py-5">
        {/* Class Topic and Information Skeleton */}
        <div className="flex flex-col flex-wrap">
          <div className="flex gap-x-2 flex-wrap">
            <div className="h-6 fold:h-5 mobileM:h-6 w-24 bg-gray-200 rounded-full"></div>
            <div className="h-6 fold:h-5 mobileM:h-6 w-48 mt-3 mobileM:mt-0 bg-gray-200 rounded-full"></div>
          </div>
          <div className="h-4 fold:h-3 mobileM:h-4 w-20 bg-gray-200 mt-2 rounded-full"></div>
        </div>

        {/* Useful Links Skeleton */}
        <div className="flex flex-col gap-2">
          {/* GitHub Topics Link Skeleton */}
          <div className="flex items-center gap-3">
            <div className="h-14 fold:h-12 mobileM:h-14 w-14 fold:w-12 mobileM:w-14 bg-gray-200 rounded-full"></div>
            {/* <div className="h-6 fold:h-5 mobileM:h-6 w-6 bg-gray-200 rounded-full"></div> */}
            <div className="h-6 fold:h-5 mobileM:h-6 w-36 bg-gray-200 rounded-full"></div>
            <div className="h-5 fold:h-4 mobileM:h-5 w-5 bg-gray-200 rounded-full"></div>
          </div>

          {/* Zoom Class Link Skeleton */}
          <div className="flex items-center gap-3">
            <div className="h-14 fold:h-14 mobileM:h-14 w-16 fold:w-14 mobileM:w-14 bg-gray-200 rounded-full"></div>
            <div className="h-6 fold:h-5 mobileM:h-6 w-36 bg-gray-200 rounded-full"></div>
            <div className="h-5 fold:h-4 mobileM:h-5 w-5 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        {/* Date and Time Information Skeleton */}
        <div className="flex justify-between items-center border-t text-gray-500 text-xs sm:text-sm md:text-base pt-4">
          {/* Date Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-5 fold:h-4 mobileM:h-5 w-5 bg-gray-200 rounded-full"></div>
            <div className="h-4 fold:h-3 mobileM:h-4 w-24 bg-gray-200 rounded-full"></div>
          </div>

          {/* Time Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-5 fold:h-4 mobileM:h-5 w-5 bg-gray-200 rounded-full"></div>
            <div className="h-4 fold:h-3 mobileM:h-4 w-16 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default UpcomingCardSkeleton;
