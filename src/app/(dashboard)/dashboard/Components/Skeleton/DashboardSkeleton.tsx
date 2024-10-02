import React from "react";
import CourseCardSkeleton from "./CourseCardSkeleton";
import ClassCardSkeleton from "./ClassCardSkeleton";
import UpcomingCardSkeleton from "./UpcomingClassCardSkeleton";

// Class section skeleton
const ClassSectionSkeleton: React.FC = () => (
  <section className="flex-1 flex flex-col gap-4 mb-10">
    <header className="flex justify-start">
      {/* Header skeleton */}
      {/* <div className="h-6 w-1/3 bg-gray-200 rounded-full mt-10"></div> */}
    </header>
    {[1, 2].map((index) => (
      <ClassCardSkeleton key={index} />
    ))}
  </section>
);

// Upcoming class section skeleton
const UpcomingClassSectionSkeleton: React.FC = () => (
  <section className="flex-1 flex flex-col gap-4 mb-10">
    <header className="flex justify-start">
      {/* Header skeleton */}
      {/* <div className="h-6 w-1/3 bg-gray-200 rounded-full mt-10"></div> */}
    </header>
    {[1].map((index) => (
      <UpcomingCardSkeleton key={index} />
    ))}
  </section>
);

// Dashboard skeleton
const DashboardSkeleton: React.FC = () => {
  return (
    <main className=" ">
      {/* Render recent courses skeleton */}
      <section className="mb-8 mt-8">
        {[1].map((index) => (
          <CourseCardSkeleton key={index} />
        ))}
      </section>

      {/* Grid layout for aligning classes side by side on larger screens */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Render recent classes skeleton */}
        <ClassSectionSkeleton />

        {/* Render upcoming classes skeleton */}
        <UpcomingClassSectionSkeleton />
      </section>
    </main>
  );
};

export default DashboardSkeleton;
