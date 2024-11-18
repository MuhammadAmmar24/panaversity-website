const AccountSettingsSkeleton: React.FC = () => {
  return (
    <main className="font-poppins mb-8 mt-5 flex min-h-screen items-center justify-center">
      <section className="w-full max-w-full animate-pulse rounded-lg bg-white p-4 shadow-lg sm:p-6 md:p-8">
        {/* Page Title Skeleton */}
        <div className="mb-4 h-6 w-40 rounded-full bg-gray-200"></div>

        {/* Profile Information Section Skeleton */}
        <section className="mb-6 rounded-lg border-2 border-gray-200 px-4 pb-4 pt-2 sm:px-6 md:pb-6">
          <div className="flex justify-end">
            <div className="h-6 w-6 rounded-full bg-gray-200"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
              {/* Profile Picture Skeleton */}
              <div className="h-10 w-10 rounded-full bg-gray-200 mobileM:h-12 mobileM:w-12 md:h-16 md:w-16"></div>
              <div>
                {/* Profile Info Skeleton */}
                <div className="mb-2 h-6 w-32 rounded-full bg-gray-200"></div>
                <div className="h-4 w-24 rounded-full bg-gray-200"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Information Section Skeleton */}
        <section className="mb-6 rounded-lg border-2 border-gray-200 px-4 py-4 sm:px-6 sm:py-6">
          <div className="flex justify-between">
            <div className="mb-2 h-6 w-40 rounded-full bg-gray-200"></div>
            <div className="h-6 w-6 rounded-full bg-gray-200"></div>
          </div>
          <div className="grid grid-cols-1 gap-4 text-sm sm:text-base md:grid-cols-2">
            <div>
              <div className="mb-2 h-4 w-24 rounded-full bg-gray-200"></div>
              <div className="h-6 w-40 rounded-full bg-gray-200"></div>
            </div>
            <div>
              <div className="mb-2 h-4 w-24 rounded-full bg-gray-200"></div>
              <div className="h-6 w-40 rounded-full bg-gray-200"></div>
            </div>
          </div>

          {/* Address Information Section Skeleton */}
          <div className="mt-4 text-sm sm:text-base">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="mb-2 h-4 w-24 rounded-full bg-gray-200"></div>
                <div className="h-6 w-full rounded-full bg-gray-200"></div>
              </div>
              <div>
                <div className="mb-2 h-4 w-24 rounded-full bg-gray-200"></div>
                <div className="h-6 w-full rounded-full bg-gray-200"></div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="mb-2 h-4 w-24 rounded-full bg-gray-200"></div>
                <div className="h-6 w-full rounded-full bg-gray-200"></div>
              </div>
              <div>
                <div className="mb-2 h-4 w-24 rounded-full bg-gray-200"></div>
                <div className="h-6 w-full rounded-full bg-gray-200"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Password Settings Section Skeleton */}
        <section className="mb-6 rounded-lg border-2 border-gray-200 px-4 py-4 sm:px-6 sm:py-6">
          <div className="mb-4 h-6 w-40 rounded-full bg-gray-200"></div>
          <div className="h-6 w-full rounded-full bg-gray-200"></div>
        </section>
      </section>
    </main>
  );
};

export default AccountSettingsSkeleton;
