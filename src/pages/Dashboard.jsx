import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [sideBarToggle, setSideBarToggle] = useState(true);
  const [mobileSideToggle, setMoblieSideToggle] = useState(false);
  const togglerClick = () => {
    setSideBarToggle((show) => !show);
    setMoblieSideToggle((show) => !show);
  };
  // const toggleSidebar = () => {
  //   setSideBarToggle((show) => !show);
  // };
  // const toggleMobileSidebar = () => {
  //   setMoblieSideToggle((show) => !show);
  // };
  return (
    <div className="flex flex-col">
      <Header togglerClick={togglerClick} />
      <div className="flex">
        <Sidebar
          sideBarToggle={sideBarToggle}
          togglerClick={togglerClick}
          mobileSideToggle={mobileSideToggle}
        />
        <div
          className={`m-0 w-full transition-all duration-300 ${
            sideBarToggle ? "lg:ml-[292px]" : " lg:ml-0"
          }`}
        >
          {<Outlet />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
