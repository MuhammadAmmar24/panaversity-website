import { Card, CardContent, CardFooter } from '@/src/components/ui/card';

const SectionLoadingCard = () => {
  return (
    <Card className="w-full items-end px-0 ssm:max-w-[30em] sm:w-full sm:px-2 md:px-0 lg:px-0">
      <CardContent className="-mb-3 p-4 mobileM:p-4 xs:p-6 sm:p-4 md:p-4 lg:p-4 xl:mb-2 xl:px-4 xl:py-0 xl:pt-4">
        <p className="mb-1 text-xs font-semibold text-primary">
          Available Sections:
        </p>
        
        {/* Section tabs loading skeleton */}
        <div className="mt-2 flex items-center justify-center space-x-2">
          <div className="grid w-full grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="h-8 animate-pulse rounded-md bg-gray-200"
              />
            ))}
          </div>
        </div>

        {/* Schedule loading skeleton */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            {/* Days row */}
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div 
                  key={i} 
                  className="h-6 w-8 animate-pulse rounded bg-gray-200"
                />
              ))}
            </div>

            {/* Time and duration rows */}
            <div className="mt-4 space-y-4">
              {[1, 2].map((row) => (
                <div key={row} className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-4 animate-pulse rounded bg-gray-200" />
                  <div className="col-span-1 h-4 animate-pulse rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom info skeleton */}
          <div className="flex flex-col space-y-2 pt-2">
            <div className="flex justify-between">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="flex justify-between">
              <div className="h-6 w-16 animate-pulse rounded bg-gray-200" />
              <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mobileM:p-4 mobileM:pt-0 xs:p-6 xs:pt-0 sm:p-4 sm:pt-0 md:p-4 md:pt-0 lg:p-4 lg:pt-0 xl:p-4 xl:pt-0">
        <div className="h-10 w-full animate-pulse rounded-md bg-gray-200" />
      </CardFooter>
    </Card>
  );
};

export default SectionLoadingCard;