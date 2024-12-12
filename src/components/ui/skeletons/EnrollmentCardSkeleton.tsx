
import { Card } from '@/src/components/ui/card';

const ScheduleCardSkeleton = () => {
  return (
    <Card className="w-80 p-4 space-y-4">
      {/* Available Sections */}
      <div className="space-y-2">
        <div className="text-sm text-gray-500">Available Sections:</div>
        <div className="flex gap-2">
          <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-lg" />
          <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-lg" />
        </div>
      </div>

      {/* Schedule Section */}
      <div className="space-y-2">
        <div className="text-sm text-gray-500">Section Classes Schedule:</div>
        <div className="bg-gray-100 p-2 rounded-lg">
          {/* Week Days */}
          <div className="flex justify-between mb-4">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="h-6 w-6 rounded-full bg-gray-200 animate-pulse"
              />
            ))}
          </div>

          {/* Schedule Details */}
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="flex justify-between items-center">
        <div className="h-4 w-28 bg-gray-200 animate-pulse rounded" />
        <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
      </div>

      {/* Price */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">Price:</div>
        <div className="h-6 w-24 bg-gray-200 animate-pulse rounded" />
      </div>

      {/* Enroll Button */}
      <div className="h-10 w-full bg-gray-200 animate-pulse rounded-lg" />
    </Card>
  );
};

export default ScheduleCardSkeleton;