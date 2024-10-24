
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/src/components/ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string
};

export  const CardWrapper = ({
  children,
  headerLabel
}: CardWrapperProps) => {
  return (
    <Card className="w-[300px] mobileM:w-[350px] xs:w-[400px] md:w-[400px]  shadow-md h-fit bg-background">
      <CardHeader>
        <h2 className="text-2xl font-semibold text-center">{headerLabel}</h2>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};