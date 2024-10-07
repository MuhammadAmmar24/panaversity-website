import ClientDropdown from "./TopbarDropdownClient";
import { signOut } from "@/src/auth";
import { DropdownProps } from "../../types/types";


const Dropdown: React.FC<DropdownProps> = ({
  userName,
  userEmail,
  userImage,
}) => {
  // Sign out function
  const handleSignOut = async () => {
    await signOut();
    window.location.reload();
  };

  return (
    <ClientDropdown
      userName={userName}
      userEmail={userEmail}
      userImage={userImage}
      onSignOut={handleSignOut}
    />
  );
};

export default Dropdown;
