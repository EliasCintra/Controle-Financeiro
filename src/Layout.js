import Sidebar from "./pages/global/Sidebar";
import Topbar from "./pages/global/Topbar";
import { useState } from "react";
import Dashboard from "./pages/dashboard/DashboardPage";


export default function Layout (){
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