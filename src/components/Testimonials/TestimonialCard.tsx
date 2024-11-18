import Image from "next/image";

interface TestimonialCardProps {
  testimonial: {
    name: string;
    position: string;
    img: string;
    content: string;
  };
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

const TestimonialCard = ({
  testimonial,
  handleMouseEnter,
  handleMouseLeave,
}: TestimonialCardProps) => {
  return (
    <div
      className="testimonial-card rounded-[20px] border p-3 shadow-md xs:p-4 sm:p-6"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-between pb-4 xs:justify-start xs:space-x-4 sm:pb-6">
        <div className="">
          <Image
            src={testimonial.img}
            alt={testimonial.name}
            loading="lazy"
            width={300}
            height={300}
            className="rounded-full border"
          />
        </div>
        <div>
          <h3 className="font-poppins text-lg font-medium mobileM:text-xl">
            {testimonial.name}
          </h3>
          <p className="text-sm leading-4 md:text-xs">{testimonial.position}</p>
        </div>
      </div>
      <p className="mb-2 text-base opacity-75">{testimonial.content}</p>
    </div>
  );
};

export default TestimonialCard;
