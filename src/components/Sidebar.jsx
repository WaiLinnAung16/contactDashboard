import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { RiContactsLine } from "react-icons/ri";
const Sidebar = ({ sideBarToggle }) => {
  return (
    <div
      className={`w-[300px] min-h-screen shadow fixed text-slate-900 -translate-x-[100%] transition-all duration-300  ${
        sideBarToggle ? "lg:translate-x-0" : "lg:-translate-x-[100%]"
      }`}
    >
      <ul className="flex flex-col mt-4">
        <Link to={"/create"}>
          <div className=" w-fit px-6 py-3 mb-5 ml-5 rounded-full flex items-center gap-4 bg-white text-black font-semibold shadow border border-gray-200 transition-all hover:bg-blue-200/40 hover:text-blue-600 hover:shadow-xl">
            <AiOutlinePlus size={20} />
            Create Contact
          </div>
        </Link>
        <NavLink to={"/"}>
          <div className=" w-[280px]  flex justify-between items-center py-2 px-6 rounded-r-full transition-all hover:bg-gray-200">
            <div className=" flex items-center gap-x-5">
              <RiContactsLine />
              <span>Contacts</span>
            </div>
            <span>8</span>
          </div>
        </NavLink>
        <NavLink to={"/detail"}>
          <div className=" w-[280px]  flex justify-between items-center py-2 px-6 rounded-r-full transition-all hover:bg-gray-200">
            <div className=" flex items-center gap-x-5">
              <RiContactsLine />
              <span>Contacts</span>
            </div>
          </div>
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
