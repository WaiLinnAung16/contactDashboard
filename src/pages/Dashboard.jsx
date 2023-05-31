import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="m-0 lg:ml-[300px]">{<Outlet />}</div>
      </div>
    </div>
  );
};

export default Dashboard;
