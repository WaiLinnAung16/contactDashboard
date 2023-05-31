import { AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
  return (
    <header className="py-6 flex gap-20 bg-gray-50 w-full px-5 items-center justify-between border-b border-gray-200 shadow-sm">
      <div className="px-4 py-2 bg-gray-200 rounded-lg h-12 w-full">
        <form className=" flex gap-2  items-center ">
          <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-300">
            <AiOutlineSearch />
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

      <div className=" flex gap-10 justify-center items-center">
        <div className=" flex flex-col text-sm bg-gray-100 px-2 py-2 rounded">
          <span>Min Khant Zaw</span>
          <span>minkhantzaw.peti@gmail.com</span>
        </div>

        <div>
          <div className="flex justify-center items-center h-10 w-10 rounded-full bg-red-500 text-white cursor-pointer">
            M
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
