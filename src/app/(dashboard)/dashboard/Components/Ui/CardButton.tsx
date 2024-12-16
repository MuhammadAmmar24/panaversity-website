import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/src/components/ui/tooltip';
import { cn } from '@/src/lib/utils';
import { CardButtonProps } from '../../types/courses';

export function CardButton({
  status,
  tooltipContent,
  onClick,
  children,
}: CardButtonProps) {
  const baseClasses = 'py-[2px] sm:py-1 min-w-[93px] sm:min-w-[125px] rounded-full shadow-lg transition duration-300';
  const statusClasses = {
    active: 'cursor-default border-2 border-accent bg-accent text-white',
    reserved_seat: 'border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white',
    expired_reservation: 'border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white',
  };

  const button = (
    <button onClick={onClick} className={cn(baseClasses, statusClasses[status])}>
      {children}
    </button>
  );

  return tooltipContent ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent className="mb-1 text-xs font-medium">
          <span>{tooltipContent}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    button
  );
}