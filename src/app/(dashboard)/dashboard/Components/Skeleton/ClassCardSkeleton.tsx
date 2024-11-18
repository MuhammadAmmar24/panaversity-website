const ClassCardSkeleton: React.FC = () => {
  return (
    <article className="h-full w-full animate-pulse">
      <div className="flex flex-col items-start rounded-lg bg-white px-4 py-4 shadow-xl fold:px-2 mobileM:px-4 sm:px-6 md:flex-row md:items-center md:gap-6 md:py-5 lg:px-8">
        {/* YouTube Icon skeleton */}
        <div className="h-10 w-10 rounded-lg bg-gray-200 fold:h-8 fold:w-8 mobileM:h-12 mobileM:w-12 sm:h-14 md:h-20 lg:h-14 lg:w-24"></div>

        {/* Class details container skeleton */}
        <div className="flex w-full flex-col items-start justify-between gap-1">
          {/* Class Title skeleton */}
          <div className="mb-2 mt-1 h-6 w-1/2 rounded-full bg-gray-200 fold:h-4 mobileM:h-5 md:mt-0"></div>

          {/* Class metadata skeleton */}
          <div className="w-full border-t pt-2 md:pt-3">
            <div className="mb-2 h-4 w-1/3 rounded-full bg-gray-200 fold:h-3 mobileM:h-4"></div>

            {/* Date and time details skeleton */}
            <div className="flex flex-col pt-1 text-xs text-gray-500 sm:flex-row sm:gap-10 sm:text-sm">
              {/* Class date skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-4 w-20 rounded-full bg-gray-200 fold:h-3 mobileM:h-4"></div>
                <div className="h-4 w-20 rounded-full bg-gray-200 fold:h-3 mobileM:h-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ClassCardSkeleton;
