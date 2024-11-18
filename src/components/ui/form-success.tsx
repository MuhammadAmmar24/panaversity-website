import { CheckCircle } from "lucide-react";

export const FormSuccess = ({ message }: { message: string | undefined }) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
      <CheckCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
