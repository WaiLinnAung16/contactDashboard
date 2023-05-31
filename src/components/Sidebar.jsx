import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[300px] min-h-screen fixed bg-slate-50 text-slate-900 -translate-x-[100%] lg:translate-x-0">
      <ul className="flex flex-col gap-5">
        <NavLink to={"/create"} className="underline">
          Create Contact
        </NavLink>
        <NavLink to={"/detail"} className="underline">
          Detail
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
