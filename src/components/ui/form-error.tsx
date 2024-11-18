import { AlertTriangleIcon } from "lucide-react";

export const FormError = ({ message }: { message: string | undefined }) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
      <AlertTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
