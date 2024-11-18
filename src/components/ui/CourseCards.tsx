import { Card, CardContent } from "@/src/components/ui/card";

interface CourseCardProps {
  content: { quarter: string; title: string; description: string }[];
}

export default function CourseCard({ content }: CourseCardProps) {
  return (
    <Card className="w-full border-none bg-inherit shadow-none">
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        {content.map((item, index) => (
          <div
            key={index}
            className="flex w-full flex-col items-center rounded-2xl border border-white/40 bg-white/10 px-2 py-6 text-center text-white/40 backdrop-blur-sm mobileM:px-3 xs:px-6 md:px-4 lg:max-w-[450px] lg:px-8 xl:max-w-[550px]"
          >
            <div className="flex w-full flex-col items-center gap-1">
              <h3 className="font-poppins text-lg uppercase tracking-tight text-white md:text-2xl">
                {item.title}
              </h3>
              <div className="font-poppins my-1 rounded-lg bg-accent px-6 py-1 text-xs font-bold text-gray-950 sm:text-sm md:text-lg">
                {item.quarter}
              </div>
              <p className="mt-2 text-sm text-white/40 md:text-lg">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
