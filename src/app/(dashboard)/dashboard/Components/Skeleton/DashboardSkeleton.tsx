import CourseCardSkeleton from "./CourseCardSkeleton";

const DashboardSkeleton: React.FC = () => {
  return (
    <main className="my-10 sm:my-14">
      <h1 className="font-poppins mb-4 text-sm font-medium text-textPrimary/90 fold:text-base mobileM:text-xl md:text-3xl">
        Enrolled Courses
      </h1>
      <section className="grid grid-cols-1 gap-8 sm:gap-y-12 lg:grid-cols-2">
        {[1, 2, 3, 4].map((index) => (
          <CourseCardSkeleton key={index} />
        ))}
      </section>
    </main>
  );
};

export default DashboardSkeleton;