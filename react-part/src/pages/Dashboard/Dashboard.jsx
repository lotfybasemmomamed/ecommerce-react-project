import { Outlet } from "react-router-dom";
import SideBar from "../../component/Dashboard/SideBar";
import TopBar from "../../component/Dashboard/TopBar";

import React from "react";

function Dashboard() {
  return (
    <div>
      <TopBar />
      <div className="flex ">
        <SideBar />
         <div className="flex-1 p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
