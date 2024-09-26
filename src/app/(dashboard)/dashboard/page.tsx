import Sidebar from "./Components/Sidebar";
import TopBar from "./Components/TopBar";
import Dashboard from "./Components/Dashboard";
import Welcome from "./Components/Welcome";

export default function Home() {
  return (
    <div className="flex mr-16">
      <Sidebar />
      <div className="flex-1">
        <TopBar />
        <Welcome />
        <Dashboard />
      </div>
    </div>
  );
}
