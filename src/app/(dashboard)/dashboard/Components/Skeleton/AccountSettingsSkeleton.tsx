import React from "react";

const AccountSettingsSkeleton: React.FC = () => {
  return (
    <main className="min-h-screen flex justify-center items-center mt-5 mb-8 font-poppins">
      <section className="w-full max-w-full p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg animate-pulse">
        {/* Page Title Skeleton */}
        <div className="h-6 w-40 bg-gray-200 rounded-full mb-4"></div>

        {/* Profile Information Section Skeleton */}
        <section className="mb-6 border-2 border-gray-200 rounded-lg px-4 sm:px-6 pb-4 md:pb-6 pt-2">
          <div className="flex justify-end">
            <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center flex-wrap justify-center gap-2 md:gap-4">
              {/* Profile Picture Skeleton */}
              <div className="w-10 h-10 mobileM:w-12 mobileM:h-12 md:w-16 md:h-16 bg-gray-200 rounded-full"></div>
              <div>
                {/* Profile Info Skeleton */}
                <div className="h-6 w-32 bg-gray-200 rounded-full mb-2"></div>
                <div className="h-4 w-24 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Information Section Skeleton */}
        <section className="mb-6 border-2 border-gray-200 px-4 sm:px-6 py-4 sm:py-6 rounded-lg">
          <div className="flex justify-between">
            <div className="h-6 w-40 bg-gray-200 rounded-full mb-2"></div>
            <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
            <div>
              <div className="h-4 w-24 bg-gray-200 rounded-full mb-2"></div>
              <div className="h-6 w-40 bg-gray-200 rounded-full"></div>
            </div>
            <div>
              <div className="h-4 w-24 bg-gray-200 rounded-full mb-2"></div>
              <div className="h-6 w-40 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          {/* Address Information Section Skeleton */}
          <div className="mt-4 text-sm sm:text-base">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded-full mb-2"></div>
                <div className="h-6 w-full bg-gray-200 rounded-full"></div>
              </div>
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded-full mb-2"></div>
                <div className="h-6 w-full bg-gray-200 rounded-full"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded-full mb-2"></div>
                <div className="h-6 w-full bg-gray-200 rounded-full"></div>
              </div>
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded-full mb-2"></div>
                <div className="h-6 w-full bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Password Settings Section Skeleton */}
        <section className="mb-6 border-2 border-gray-200 px-4 sm:px-6 py-4 sm:py-6 rounded-lg">
          <div className="h-6 w-40 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-6 w-full bg-gray-200 rounded-full"></div>
        </section>
      </section>
    </main>
  );
};

export default AccountSettingsSkeleton;
