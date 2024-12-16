import { GoAlert } from "react-icons/go";

const Error: React.FC<{ message: string | undefined }> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="inline-flex items-center gap-1 sm:gap-2 rounded-md text-[8px] sm:text-xs text-red-600">
      <GoAlert className="h-2 w-2 sm:h-3 sm:w-3 text-red-500" />
      <p>{message}</p>
    </div>
  );
};

export default Error;