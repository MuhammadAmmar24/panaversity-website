import { Card, CardContent } from "@/src/components/ui/card";

interface CourseCardProps {
  content: { quarter: string; title: string; description: string }[];
}

export default function CourseCard({ content }: CourseCardProps) {
  return (
    <Card className="w-full bg-inherit border-none shadow-none">
      <CardContent className="flex flex-col space-y-4 items-center justify-center">
        {content.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-white/40 w-full lg:max-w-[450px] xl:max-w-[550px] text-center py-6 border-white/40 border bg-white/10 backdrop-blur-sm rounded-2xl px-2 mobileM:px-3 xs:px-6 md:px-4 lg:px-8"
          >
            <div className="w-full flex flex-col gap-1 items-center">
              <h3 className="text-lg md:text-2xl uppercase font-poppins tracking-tight text-white">
                {item.title}
              </h3>
              <div className="font-poppins text-gray-950 bg-accent text-xs sm:text-sm md:text-lg font-bold px-6 py-1 my-1 rounded-lg">
                {item.quarter}
              </div>
              <p className="text-sm md:text-lg text-white/40 mt-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
