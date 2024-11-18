import { AlertTriangleIcon } from "lucide-react";

const Error: React.FC<{ message: string | undefined }> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="my-4 inline-flex items-center gap-x-2 rounded-md px-4 py-2 text-sm text-red-600">
      <AlertTriangleIcon className="h-4 w-4 text-red-500" />
      <p>{message}</p>
    </div>
  );
};

export default Error;
