import { Skeleton } from '@/src/components/ui/skeleton';
import React from 'react'

const ProgramsSkeleton : React.FC  = () => {
    return (
        <div className="h-fit flex flex-col bg-background dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:-translate-y-[2px] w-full fold:w-[15rem] mobileM:w-[18rem] xs:w-[23rem] sm:w-full md:w-full pb-[1rem]">
          <div className="h-[14rem] w-full ">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="h-[8rem] fold:h-[7rem] p-3 flex flex-col justify-between">
            <div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-6 w-full mt-2" />
            </div>
          </div>
        </div>
      );
}

export default ProgramsSkeleton



