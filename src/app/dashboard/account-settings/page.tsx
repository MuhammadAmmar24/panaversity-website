import AccountSettings from "../Components/AccountSettingspage";
import Sidebar from "../Components/Sidebar";
import TopBar from "../Components/TopBar";


export default function page() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 mr-2 ml-3 md:mr-20 md:ml-20">
        <TopBar />
        <AccountSettings />
      </div>
    </div>
  );
}
