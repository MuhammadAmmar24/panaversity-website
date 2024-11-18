import ClassCardSkeleton from "./ClassCardSkeleton";
import CourseCardSkeleton from "./CourseCardSkeleton";
import UpcomingCardSkeleton from "./UpcomingClassCardSkeleton";

// Class section skeleton
const ClassSectionSkeleton: React.FC = () => (
  <section className="mb-10 flex flex-1 flex-col gap-4">
    <header className="flex justify-start">{/* Header skeleton */}</header>
    {[1, 2].map((index) => (
      <ClassCardSkeleton key={index} />
    ))}
  </section>
);

// Upcoming class section skeleton
const UpcomingClassSectionSkeleton: React.FC = () => (
  <section className="mb-10 flex flex-1 flex-col gap-4">
    <header className="flex justify-start">{/* Header skeleton */}</header>
    {[1].map((index) => (
      <UpcomingCardSkeleton key={index} />
    ))}
  </section>
);

// Dashboard skeleton
const DashboardSkeleton: React.FC = () => {
  return (
    <main className="my-10 sm:my-14">
      <h1 className="font-poppins mb-4 text-sm font-medium text-textPrimary/90 fold:text-base mobileM:text-xl md:text-3xl">
        Enrolled Courses
      </h1>
      {/* Render recent courses skeleton */}
      <section className="mb-8 mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {[1, 2, 3, 4].map((index) => (
          <CourseCardSkeleton key={index} />
        ))}
      </section>

      {/* Grid layout for aligning classes side by side on larger screens */}
      {/* <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10"> */}
      {/* Render recent classes skeleton */}
      {/* <ClassSectionSkeleton /> */}

      {/* Render upcoming classes skeleton */}
      {/* <UpcomingClassSectionSkeleton /> */}
      {/* </section> */}
    </main>
  );
};

export default DashboardSkeleton;
