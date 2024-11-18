const WelcomeSkeleton: React.FC = () => {
  return (
    <section className="w-full animate-pulse">
      {/* Placeholder for Welcome message */}
      <div className="mt-20 h-8 w-[60vw] rounded-full bg-gray-200 sm:w-[50vw] md:w-[35vw] lg:w-[25vw]"></div>
      {/* Placeholder for subtitle */}
      <div className="mt-4 h-6 w-[40vw] rounded-full bg-gray-200 sm:w-3/4 md:w-1/2 lg:w-1/6"></div>
    </section>
  );
};

export default WelcomeSkeleton;
