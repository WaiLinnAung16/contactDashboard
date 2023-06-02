import { AiOutlinePlus } from "react-icons/ai";
import { RiContactsLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import logo from "../assets/contacts-logo.png";
import { Link, NavLink } from "react-router-dom";
import { useGetContactQuery } from "../redux/api/contactApi";
import Cookies from "js-cookie";

const Sidebar = ({ sideBarToggle, toggleSidebar }) => {
  const token = Cookies.get("token");
  const { data } = useGetContactQuery(token);
  const contactLength = data?.contacts?.data.length;
  return (
    <>
      <div
        className={`w-[290px] min-h-screen fixed bg-white text-slate-900  transition duration-300 border-r z-30 lg:z-0 top-0 lg:top-[65px] ${
          sideBarToggle ? "lg:translate-x-0" : "-translate-x-[100%]"
        }`}
      >
        <div className="items-center gap-2 pt-3 px-5 flex lg:hidden">
          <div
            onClick={toggleSidebar}
            className="flex justify-center items-center transition w-10 h-10 rounded-full hover:bg-gray-300/50 cursor-pointer"
          >
            <RxCross2 size={20} />
          </div>
          <Link to={"/"} className=" flex items-center">
            <img src={logo} alt="logo" className=" w-10 hidden sm:block" />
            <span className="text-2xl font-normal tracking-tight text-[#5f6368]">
              Contacts
            </span>
          </Link>
        </div>
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
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
