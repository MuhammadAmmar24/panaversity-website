const PaymentStatusSkeleton = () => {
  return (
    <div className="w-full max-w-sm animate-pulse pb-5 text-center sm:pb-2">
      <div className="mb-4 flex justify-center">
        <div className="rounded-full bg-gray-200 p-4">
          {/* Skeleton circle matching icon size */}
          <div className="h-20 w-20 rounded-full bg-gray-300" />
        </div>
      </div>
      {/* Title skeleton */}
      <div className="mx-auto mb-4 h-8 w-48 rounded-lg bg-gray-200" />
      {/* Description skeleton - two lines */}
      <div className="mx-auto mb-2 h-4 w-full max-w-xs rounded bg-gray-200" />
      <div className="mx-auto mb-8 h-4 w-3/4 rounded bg-gray-200" />
      {/* Button skeleton */}
      <div className="h-12 w-full rounded-xl bg-gray-200" />
    </div>
  );
};

export default PaymentStatusSkeleton;
