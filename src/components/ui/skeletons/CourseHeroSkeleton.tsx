import React from "react";

const CourseHeroSkeleton = () => {
    return (
      <div className="relative min-h-[400px] bg-[#023430] overflow-hidden">
        {/* Breadcrumb */}
        <div className="container mx-auto pt-6">
          <div className="flex gap-2 items-center text-gray-300">
            {[1, 2, 3, 4].map((item) => (
              <React.Fragment key={item}>
                <div className="h-4 w-16 bg-gray-600/50 animate-pulse rounded" />
                {item !== 4 && <span className="text-gray-500">›</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
  
        {/* Main Content */}
        <div className="container mx-auto py-12 relative z-10">
          {/* Course Code */}
          <div className="inline-block mb-6">
            <div className="h-8 w-20 bg-emerald-700/50 animate-pulse rounded-lg" />
          </div>
  
          {/* Title */}
          <div className="mb-6">
            <div className="h-16 w-2/3 bg-gray-600/50 animate-pulse rounded-lg" />
          </div>
  
          {/* Description */}
          <div className="mb-8">
            <div className="h-20 w-3/4 bg-gray-600/50 animate-pulse rounded-lg" />
          </div>
  
          {/* Stats */}
          <div className="flex gap-8 items-center">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-gray-600/50 animate-pulse rounded-full" />
              <div className="h-4 w-32 bg-gray-600/50 animate-pulse rounded" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-gray-600/50 animate-pulse rounded-full" />
              <div className="h-4 w-32 bg-gray-600/50 animate-pulse rounded" />
            </div>
          </div>
  
          {/* Rating */}
          <div className="flex items-center gap-2 mt-6">
            <div className="h-8 w-12 bg-gray-600/50 animate-pulse rounded" />
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <div 
                  key={star} 
                  className="h-6 w-6 bg-gray-600/50 animate-pulse rounded"
                />
              ))}
            </div>
            <div className="h-6 w-28 bg-gray-600/50 animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  };
  
  export default CourseHeroSkeleton;