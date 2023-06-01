import logo from "../assets/contacts-logo.png";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";

const Header = ({ toggleSidebar }) => {
  return (
    <div className=" flex items-center py-3 sticky top-0 px-5 shadow">
      <div className="mr-3 md:hidden lg:flex" onClick={toggleSidebar}>
        <FiMenu className="text-2xl cursor-pointer" />
      </div>
      <div className="w-[300px]">
        <Link to={"/"}>
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className=" w-10" />
            <span className="text-2xl">Contacts</span>
          </div>
        </Link>
      </div>

      <div className="flex-1">
        <div className="px-4 py-2 bg-gray-200 rounded-lg h-12 w-[700px] hidden md:block">
          <form className=" flex gap-2  items-center ">
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-300">
              <AiOutlineSearch size={20} />
            </button>

            <input
              className=" bg-transparent outline-none placeholder:text-gray-400 w-full "
              type="text"
              name=""
              id=""
              placeholder="Search"
            />
          </form>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="w-10 h-10 bg-slate-500 rounded-full"></div>
        <div className="w-10 h-10 bg-slate-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default Header;
