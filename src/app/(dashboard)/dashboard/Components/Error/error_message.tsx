import { AlertTriangleIcon } from "lucide-react";

interface ErrorProps {
  message?: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  // If no message is provided, don't render the component
  if (!message) return null;

  return (
    <div className="inline-flex rounded-md items-center gap-x-2 text-sm text-red-600 my-4 px-4 py-2">
      <AlertTriangleIcon className="h-4 w-4 text-red-500" />
      <p>{message}</p>
    </div>
  );
};

export default Error;