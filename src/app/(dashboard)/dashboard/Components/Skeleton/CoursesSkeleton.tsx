import ProgramsSkeleton from "./ProgramsSkeleton";
export const CoursesSkeleton = () => {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-12 sm:grid-cols-2 md:justify-items-stretch md:gap-20 xl:grid-cols-3">
      {[1, 2, 3, 4, 5, 6, 7].map((index) => (
        <div
          key={index}
          className="flex h-fit w-full transform flex-col overflow-hidden rounded-xl bg-background pb-[1rem] shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-[2px] hover:shadow-2xl fold:w-[15rem] mobileM:w-[18rem] xs:w-[23rem] sm:w-full md:w-full"
        >
          <ProgramsSkeleton />
        </div>
      ))}
    </div>
  );
};
