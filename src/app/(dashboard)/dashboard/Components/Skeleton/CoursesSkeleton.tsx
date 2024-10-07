import ProgramsSkeleton from "./ProgramsSkeleton";
export const CoursesSkeleton = () => {
    return (
        <div className="  grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 md:gap-20 justify-items-center md:justify-items-stretch">
        {[1, 2, 3, 4, 5, 6, 7].map((index) => (
          
          <div  key={index}  className="h-fit  flex flex-col bg-background dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:-translate-y-[2px] w-full fold:w-[15rem] mobileM:w-[18rem] xs:w-[23rem] sm:w-full md:w-full pb-[1rem]">
            <ProgramsSkeleton/>
          </div>
          
        ))}
      </div>
    );
  };