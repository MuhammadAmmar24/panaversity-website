import AccountSettings from "../Components/AccountSettings";
import Sidebar from "../Components/Sidebar";
import TopBar from "../Components/TopBar";


export default function page() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <TopBar />
        <AccountSettings/>
      </div>
    </div>
  );
}
