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
      className="testimonial-card p-6 border rounded-[20px] shadow-md"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center text-left mb-6">
        <div className="mr-3 w-20">
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
          <h3 className="text-xl font-medium font-poppins">{testimonial.name}</h3>
          <p className="text-sm md:text-xs mb-2">{testimonial.position}</p>
        </div>
      </div>
      <p className="opacity-75 mb-2 text-base">{testimonial.content}</p>
    </div>
  );
};

export default TestimonialCard;
