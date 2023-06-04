import logo from "../assets/contacts-logo.png";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoArrowBackSharp } from "react-icons/io5";
import { useRef, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../redux/api/contactApi";
import { removeUser } from "../redux/services/authSlice";
import { setSearchTerm } from "../redux/services/contactSlice";

const Header = ({ togglerClick }) => {
  const inputRef = useRef(null);
  const inputRefPc = useRef(null)
  
  const [search, setSearch] = useState(false);

  const handleSearchClick = () => {
    inputRef.current.focus();
    setSearch((pre) => !pre);
  };

  const dispatch = useDispatch();

  const nav = useNavigate();

  const user = JSON.parse(Cookies.get("user"));
  const token = Cookies.get("token");

  const [userToggle, setUserToggle] = useState(false);

  const [logout] = useLogoutMutation();

  const logoutHandler = async () => {
    const { data } = await logout(token);
    dispatch(removeUser());
    if (data?.success) nav("/login");
    console.log(data);
  };

  const handleSubmitPc = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(inputRefPc.current.value))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(inputRef.current.value))
  }

  return (
    <>
      <div className="flex items-center gap-6 py-2 sticky top-0 px-5 shadow z-50">
        <div className="w-[240px] md:w-[300px]">
          <div className="flex items-center gap-2">
            <div
              onClick={togglerClick}
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
          <div className="px-4 py-2 bg-gray-200 rounded-lg lg:w-[60%] h-12 hidden md:w-[400px] md:block focus-within:bg-white focus-within:shadow-md focus-within:border-none focus-within:rounded-t-lg focus-within:rounded-b-none">
            <form className=" flex gap-2  items-center " onSubmit={handleSubmitPc}>
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-300">
                <AiOutlineSearch size={20} />
              </button>

              <input
                ref={inputRefPc}
                className=" bg-transparent outline-none placeholder:text-gray-400/60 w-full  focus:bg-white"
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
            } absolute min-w-[290px] gap-5 px-2 py-2 bg-gray-200 rounded-lg left-2 top-1 h-12 md:hidden focus-within:bg-white focus-within:shadow-md focus-within:border-none focus-within:rounded-t-xl focus-within:rounded-b-none`}
          >
            <div className={`flex gap-5 items-center `}>
              <form onSubmit={handleSubmit} className="flex items-center gap-6">
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
              </form>
            </div>
          </div>
          <div
            onClick={handleSearchClick}
            className="w-9 h-9 flex justify-center items-center hover:bg-slate-200 rounded-full md:hidden "
          >
            <AiOutlineSearch size={20} />
          </div>

          <div
            className="w-10 h-10 bg-blue-700 text-white font-semibold text-md rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => setUserToggle((pre) => !pre)}
          >
            {user.name.split("")[0].toUpperCase()}
          </div>
        </div>
      </div>
      <div
        className={`absolute ${
          userToggle ? "block" : "hidden"
        } bg-gray-200 w-[90%] right-5 md:w-[400px] top-[70px] md:right-2 rounded-xl z-50 px-1 py-1 border-4 border-gray-200/50 shadow-xl`}
      >
        <div className=" flex flex-col gap-1">
          <div className="flex items-center gap-10 bg-gray-50/80 p-6 rounded-t-md">
            <div className="w-14 h-14 bg-blue-700 text-white font-bold text-xl rounded-full flex justify-center items-center">
              {user.name.split("")[0].toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="font-normal">{user?.name}</span>
              <span className="text-sm font-normal text-gray-500/60">
                {user?.email}
              </span>
            </div>
          </div>
          <div className=" border-b-2 py-3 bg-gray-50/70 rounded-b-md">
            <button
              onClick={logoutHandler}
              className=" flex items-center gap-2 ml-[119px] px-4 py-1 bg-transparent border-2 w-fit border-black/50 rounded-lg tracking-tight transition hover:bg-gray-300/50"
            >
              <FiLogOut />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
