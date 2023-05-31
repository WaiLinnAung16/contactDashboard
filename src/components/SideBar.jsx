import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { RiContactsLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";

const SideBar = () => {
  return (
    <aside className=" w-64 min-h-screen border-r border-gray-100 shadow-sm py-6 px-10">
      <Link to={"/"}>
        <div className="flex items-center gap-5">
          <img src={logo} alt="logo" className=" w-10" />
          <span className="text-xl">Contacts</span>
        </div>
      </Link>
      <ul className=" flex flex-col gap-8 pt-20">
        <Link>
          <li className=" flex gap-x-4 items-center group">
            <span className=" absolute w-1.5 h-8 bg-blue-400 rounded-full left-0 transition-all scale-y-0 group-hover:scale-y-100" />
            <AiOutlinePlus />
            Create
          </li>
        </Link>
        <Link>
          <li className=" flex gap-x-4 items-center group">
            <span className=" absolute w-1.5 h-8 bg-blue-400 rounded-full left-0 transition-all scale-y-0 group-hover:scale-y-100" />
            <RiContactsLine />
            Contacts
          </li>
        </Link>
      </ul>
    </aside>
  );
};

export default SideBar;
