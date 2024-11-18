import { Card, CardContent, CardHeader } from "@/src/components/ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
}

export const CardWrapper = ({ children, headerLabel }: CardWrapperProps) => {
  return (
    <Card className="h-fit w-[300px] bg-background shadow-md mobileM:w-[350px] xs:w-[400px] md:w-[400px]">
      <CardHeader>
        <h2 className="text-center text-2xl font-semibold">{headerLabel}</h2>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
