interface TestimonialHeaderProps {
  sectionHeading: string;
  mainHeading: string;
}

const TestimonialHeader = ({
  sectionHeading,
  mainHeading,
}: TestimonialHeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center mb-6 sm:mb-8 md:mb-12">
      <h2 className="text-md text-textPrimary mt-5 md:mt-0 text-center sm:text-lg gradient-border font-medium border-b rounded-[100px] mb-5 uppercase tracking-wide">
        {sectionHeading}
      </h2>
      <h2 className="text-3xl text-textPrimary font-poppins font-semibold tracking-tighter text-center sm:text-4xl md:text-5xl">
        {mainHeading}
      </h2>
    </div>
  );
};

export default TestimonialHeader;
