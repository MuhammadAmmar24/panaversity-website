import React from "react";

const WelcomeSkeleton: React.FC = () => {
  return (
    <section className="w-full animate-pulse">
      {/* Placeholder for Welcome message */}
      <div className="h-8 w-[60vw] sm:w-[50vw] md:w-[35vw] lg:w-[25vw] bg-gray-200 mt-20 rounded-full "></div>
      {/* Placeholder for subtitle */}
      <div className="h-6 w-[40vw] sm:w-3/4 md:w-1/2 lg:w-1/6 bg-gray-200 mt-4 rounded-full"></div>
    </section>
  );
};

export default WelcomeSkeleton;
