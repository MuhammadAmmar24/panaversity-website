interface TestimonialHeaderProps {
  sectionHeading: string;
  mainHeading: string;
}

const TestimonialHeader = ({
  sectionHeading,
  mainHeading,
}: TestimonialHeaderProps) => {
  return (
    <div className="mb-6 flex flex-col items-center justify-center text-center sm:mb-8 md:mb-12">
      <h2 className="text-md gradient-border mb-5 mt-5 rounded-[100px] border-b text-center font-medium uppercase tracking-wide text-textPrimary sm:text-lg md:mt-0">
        {sectionHeading}
      </h2>
      <h2 className="font-poppins text-center text-3xl font-semibold tracking-tighter text-textPrimary sm:text-4xl md:text-5xl">
        {mainHeading}
      </h2>
    </div>
  );
};

export default TestimonialHeader;
