import React from "react";
import { cn } from "@/src/lib/utils";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  position?: "top" | "right" | "bottom" | "left";
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  position = "top",
  className,
}) => {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
  };

  return (
    <div className="group relative">
      {children}
      <div
        className={cn(
          "absolute w-max rounded-md bg-accent px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 z-50 group-hover:opacity-100",
          positionClasses[position],
          className
        )}
      >
        {text}
      </div>
    </div>
  );
};
