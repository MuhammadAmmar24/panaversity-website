import { Skeleton } from "@/src/components/ui/skeleton";

const ProgramsSkeleton: React.FC = () => {
  return (
    <div className="flex h-fit w-full transform flex-col overflow-hidden rounded-xl bg-background pb-[1rem] shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-[2px] hover:shadow-2xl fold:w-[15rem] mobileM:w-[18rem] xs:w-[23rem] sm:w-full md:w-full">
      <div className="h-[14rem] w-full">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex h-[8rem] flex-col justify-between p-3 fold:h-[7rem]">
        <div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-full" />
          <Skeleton className="mt-2 h-6 w-full" />
        </div>
      </div>
    </div>
  );
};

export default ProgramsSkeleton;
