import { Outlet } from "react-router-dom";
import SideBar from "../../component/Dashboard/SideBar";
import TopBar from "../../component/Dashboard/TopBar";

import React from 'react'

function Dashboard() {
  return (
    <div>
        <TopBar/>
        <SideBar/>
        <Outlet/>
      
    </div>
  )
}

export default Dashboard

