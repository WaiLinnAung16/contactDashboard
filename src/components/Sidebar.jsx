import { AiOutlinePlus, AiOutlineClockCircle } from "react-icons/ai";
import { RiContactsLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import logo from "../assets/contacts-logo.png";
import { Link, NavLink } from "react-router-dom";
import { useGetContactQuery } from "../redux/api/contactApi";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const Sidebar = ({ sideBarToggle, mobileSideToggle, togglerClick }) => {
  const token = Cookies.get("token");
  const { data } = useGetContactQuery(token);
  const { frequent } = useSelector((store) => store.contactSlice);
  const contactLength = data?.contacts?.data.length;
  return (
    <>
      <div
        className={`w-[290px] min-h-screen lg:flex hidden fixed bg-white text-slate-900  transition duration-300 shadow z-50 lg:z-0 top-0 lg:top-[65px] ${
          sideBarToggle ? "lg:translate-x-0" : "lg:-translate-x-[100%]"
        }`}
      >
        <ul className="flex flex-col mt-4">
          <Link to={"/create"} className="ml-2 mb-5">
            <div className=" w-fit px-6 py-3 rounded-full outline-none flex items-center gap-4 bg-white text-black shadow border transition-all hover:shadow-xl hover:text-blue-500">
              <AiOutlinePlus size={20} />
              Create Contact
            </div>
          </Link>
          <NavLink to={"/"} className="">
            <div className=" w-[280px]  flex justify-between items-center py-2 px-8 rounded-r-full transition-all hover:bg-gray-300">
              <div className=" flex items-center gap-x-5">
                <RiContactsLine className="" />
                <span>Contacts</span>
              </div>
              <span className="">{contactLength}</span>
            </div>
          </NavLink>
          <NavLink to={"/frequent"} className="">
            <div className=" w-[280px]  flex justify-between items-center py-2 px-8 rounded-r-full transition-all hover:bg-gray-300">
              <div className=" flex items-center gap-x-5">
                <AiOutlineClockCircle className="" />
                <span>Frequent</span>
              </div>
              <span className="">
                {frequent.length !== 0 && frequent.length}
              </span>
            </div>
          </NavLink>
        </ul>
      </div>
      <div
        className={`w-[290px] min-h-screen lg:hidden flex flex-col fixed bg-white text-slate-900  transition duration-300 shadow z-50 lg:z-0 top-0 lg:top-[65px] ${
          mobileSideToggle ? "translate-x-0" : "-translate-x-[100%]"
        }`}
      >
        <div className="items-center gap-2 pt-3 px-5 flex lg:hidden">
          <div
            onClick={togglerClick}
            className="flex justify-center items-center transition w-10 h-10 rounded-full hover:bg-gray-300/50 cursor-pointer"
          >
            <RxCross2 size={20} />
          </div>
          <Link to={"/"} className=" flex items-center">
            <img src={logo} alt="logo" className=" w-10" />
            <span className="text-2xl font-normal tracking-tight text-[#5f6368]">
              Contacts
            </span>
          </Link>
        </div>
        <ul className="flex flex-col mt-4">
          <Link to={"/create"} className="ml-2 mb-5">
            <div
              onClick={togglerClick}
              className=" w-fit px-6 py-3 rounded-full outline-none flex items-center gap-4 bg-white text-black shadow border transition-all hover:shadow-xl hover:text-blue-500"
            >
              <AiOutlinePlus size={20} />
              Create Contact
            </div>
          </Link>
          <NavLink to={"/"} className="">
            <div
              onClick={togglerClick}
              className=" w-[280px]  flex justify-between items-center py-2 px-8 rounded-r-full transition-all hover:bg-gray-300"
            >
              <div className=" flex items-center gap-x-5">
                <RiContactsLine className="" />
                <span>Contacts</span>
              </div>
              <span className="">{contactLength}</span>
            </div>
          </NavLink>
          <NavLink to={"/frequent"} className="">
            <div
              onClick={togglerClick}
              className=" w-[280px]  flex justify-between items-center py-2 px-8 rounded-r-full transition-all hover:bg-gray-300"
            >
              <div className=" flex items-center gap-x-5">
                <AiOutlineClockCircle className="" />
                <span>Frequent</span>
              </div>
              <span className="">
                {frequent.length !== 0 && frequent.length}
              </span>
            </div>
          </NavLink>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
