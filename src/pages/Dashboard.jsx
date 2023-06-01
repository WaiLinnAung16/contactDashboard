import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [sideBarToggle, setSideBarToggle] = useState(true);
  const toggleSidebar = () => {
    setSideBarToggle((show) => !show);
  };
  return (
    <div className="flex flex-col">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar sideBarToggle={sideBarToggle} />
        <div
          className={`m-0 p-5 ${sideBarToggle ? "lg:ml-[300px]" : " lg:ml-0"}`}
        >
          {<Outlet />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
