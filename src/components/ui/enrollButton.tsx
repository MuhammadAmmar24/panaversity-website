import { ChevronRight } from "lucide-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface EnrollButtonProps {
  isOfferedNow: boolean;
  isActive: boolean;
  sections: any[];
  selectedSectionId?: number;
  handleClick: () => void;
  isStudentEnrolledInSection: (sectionId: number) => boolean;
  isEnrollPending?: boolean; 
}

const EnrollButton: React.FC<EnrollButtonProps> = ({
  isOfferedNow,
  isActive,
  sections,
  selectedSectionId,
  handleClick,
  isStudentEnrolledInSection,
  isEnrollPending = false,
}) => {
  const getButtonText = () => {
    if (!isOfferedNow) {
      return "Notify Me";
    }
    if (sections.length === 0) {
      return "Join Waiting List";
    }
    if (!isActive) {
      return "Registration Closed";
    }
    return selectedSectionId && isStudentEnrolledInSection(selectedSectionId)
      ? "Already Enrolled"
      : "Enroll Now";
  };

  const isDisabled =
    !isOfferedNow || (isActive && sections.length === 0) ? false : !isActive;

  const buttonStyles = `flex w-full items-center justify-center rounded-md bg-accent py-3 font-semibold text-white transition duration-300 ${
    isEnrollPending
      ? "cursor-not-allowed bg-gray-300 text-gray-500 hover:bg-gray-300"
      : !isOfferedNow || sections.length === 0
      ? "hover:bg-emerald-500 text-white"
      : isActive
      ? "hover:bg-emerald-500 text-white bg-accent"
      : "cursor-not-allowed bg-gray-400 text-gray-500"
  }`;

  return (
    <button
      onClick={handleClick}
      className={buttonStyles}
      disabled={isDisabled || isEnrollPending}
    >
      {isEnrollPending ? (
        <>
          <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        getButtonText()
      )}{" "}
      <ChevronRight className="ml-2 h-5 w-5" />
    </button>
  );
};

export default EnrollButton;
