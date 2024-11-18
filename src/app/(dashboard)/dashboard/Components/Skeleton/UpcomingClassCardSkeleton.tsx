const UpcomingCardSkeleton: React.FC = () => {
  return (
    <article className="h-full w-full animate-pulse">
      <div className="flex flex-col justify-between gap-4 rounded-lg bg-white px-4 py-5 shadow-xl fold:px-2 mobileM:px-4 sm:px-6 md:px-8">
        {/* Class Topic and Information Skeleton */}
        <div className="flex flex-col flex-wrap">
          <div className="flex flex-wrap gap-x-2">
            <div className="h-6 w-24 rounded-full bg-gray-200 fold:h-5 mobileM:h-6"></div>
            <div className="mt-3 h-6 w-48 rounded-full bg-gray-200 fold:h-5 mobileM:mt-0 mobileM:h-6"></div>
          </div>
          <div className="mt-2 h-4 w-20 rounded-full bg-gray-200 fold:h-3 mobileM:h-4"></div>
        </div>

        {/* Useful Links Skeleton */}
        <div className="flex flex-col gap-2">
          {/* GitHub Topics Link Skeleton */}
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-full bg-gray-200 fold:h-12 fold:w-12 mobileM:h-14 mobileM:w-14"></div>
            {/* <div className="h-6 fold:h-5 mobileM:h-6 w-6 bg-gray-200 rounded-full"></div> */}
            <div className="h-6 w-36 rounded-full bg-gray-200 fold:h-5 mobileM:h-6"></div>
            <div className="h-5 w-5 rounded-full bg-gray-200 fold:h-4 mobileM:h-5"></div>
          </div>

          {/* Zoom Class Link Skeleton */}
          <div className="flex items-center gap-3">
            <div className="h-14 w-16 rounded-full bg-gray-200 fold:h-14 fold:w-14 mobileM:h-14 mobileM:w-14"></div>
            <div className="h-6 w-36 rounded-full bg-gray-200 fold:h-5 mobileM:h-6"></div>
            <div className="h-5 w-5 rounded-full bg-gray-200 fold:h-4 mobileM:h-5"></div>
          </div>
        </div>

        {/* Date and Time Information Skeleton */}
        <div className="flex items-center justify-between border-t pt-4 text-xs text-gray-500 sm:text-sm md:text-base">
          {/* Date Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-gray-200 fold:h-4 mobileM:h-5"></div>
            <div className="h-4 w-24 rounded-full bg-gray-200 fold:h-3 mobileM:h-4"></div>
          </div>

          {/* Time Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-gray-200 fold:h-4 mobileM:h-5"></div>
            <div className="h-4 w-16 rounded-full bg-gray-200 fold:h-3 mobileM:h-4"></div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default UpcomingCardSkeleton;
