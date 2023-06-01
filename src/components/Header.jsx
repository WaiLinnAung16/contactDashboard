import logo from "../assets/contacts-logo.png";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoArrowBackSharp } from "react-icons/io5";
import { useRef, useState } from "react";

const Header = ({ toggleSidebar }) => {
  const inputRef = useRef(null);
  const [search, setSearch] = useState(false);

  const handleSearchClick = () => {
    inputRef.current.focus();
    setSearch((pre) => !pre);
  };

  return (
    <div className="flex items-center gap-6 py-2 sticky top-0 px-5 shadow">
      <div className="w-[240px] md:w-[300px]">
        <div className="flex items-center gap-2">
          <div
            onClick={toggleSidebar}
            className="flex justify-center items-center transition w-10 h-10 rounded-full hover:bg-gray-300/50 cursor-pointer"
          >
            <RxHamburgerMenu size={20} className="  " />
          </div>
          <Link to={"/"} className=" flex items-center">
            <img src={logo} alt="logo" className=" w-10 hidden sm:block" />
            <span className="text-2xl font-normal tracking-tight text-[#5f6368]">
              Contacts
            </span>
          </Link>
        </div>
      </div>

      <div className="flex justify-end items-center gap-3 md:justify-between w-full">
        <div className="px-4 py-2 bg-gray-200 rounded-lg lg:w-[70%] h-12 hidden md:w-[400px] md:block focus-within:bg-white focus-within:shadow-md focus-within:border-none focus-within:rounded-t-lg focus-within:rounded-b-none">
          <form className=" flex gap-2  items-center ">
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-300">
              <AiOutlineSearch size={20} />
            </button>

            <input
              className=" bg-transparent outline-none placeholder:text-gray-400 w-full  focus:bg-white"
              type="text"
              name=""
              id=""
              placeholder="Search"
            />
          </form>
        </div>

        <div
          className={`${
            search ? "flex" : "hidden"
          } absolute gap-5 px-2 py-2 bg-gray-200 rounded-lg right-16 top-1 h-12 md:hidden focus-within:bg-white focus-within:shadow-md focus-within:border-none focus-within:rounded-t-xl focus-within:rounded-b-none`}
        >
          <div className={`flex gap-5 items-center `}>
            <button
              onClick={() => setSearch((pre) => !pre)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-300"
            >
              <IoArrowBackSharp size={20} />
            </button>
            <input
              className=" bg-transparent outline-none placeholder:text-gray-400 w-full focus:bg-white"
              type="text"
              ref={inputRef}
              placeholder="Search"
            />
          </div>
        </div>
        <div
          onClick={handleSearchClick}
          className="w-9 h-9 flex justify-center items-center hover:bg-slate-200 rounded-full md:hidden "
        >
          <AiOutlineSearch size={20} />
        </div>

        <div className="w-10 h-10 bg-slate-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default Header;
