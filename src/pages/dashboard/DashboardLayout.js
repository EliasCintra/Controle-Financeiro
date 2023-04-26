import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useState } from "react";
import Dashboard from "./DashboardPage";

export default function LayoutDashboard (){
  const [isSidebar, setIsSidebar] = useState(true);

  return (
      <div className="app">
        <Sidebar isSidebar={isSidebar} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
          <Dashboard/>
        </main>
      </div>
  );
}