import React from "react";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlinePlus,
  AiOutlineUser,
} from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

const FormLoading = () => {
  return (
    <div>
      <div className="border-b top-16 bg-white fixed w-full z-20">
        <div className="flex flex-col w-full md:w-[50%] p-5">
          <div className="flex flex-col items-center md:flex-row gap-5">
            <button className=" self-start text-xl cursor-pointer">
              <BsArrowLeft />
            </button>

            <div className=" w-[150px] h-[150px] flex items-center justify-center bg-sky-200 rounded-full">
              <MdOutlineAddPhotoAlternate className=" text-3xl" />
            </div>

            <div className="flex flex-col items-center md:items-start gap-2">
              <h1 className="w-20 h-6 bg-slate-200 animate-pulse"></h1>
              <button className="hover:bg-gray-200 flex gap-3 items-center border border-gray-400 px-2 py-1 text-sm rounded-lg">
                <span className=" text-lg text-blue-700 cursor-pointer">
                  <AiOutlinePlus />
                </span>
                Label
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="md:self-end md:m-0 self-center mt-5 w-16 h-9 text-sm bg-slate-200 rounded-md animate-pulse"
          ></button>
        </div>
      </div>
      <div className=" m-10 space-y-8 mt-[430px] md:mt-[280px]">
        <div className=" flex items-center gap-8">
          <AiOutlineUser className=" text-xl text-gray-700" />
          <div className="w-[300px] rounded-md h-10 md:w-[500px] bg-slate-200 animate-pulse"></div>
        </div>
        <div className=" flex items-start gap-8">
          <div className="  flex items-center gap-8">
            <AiOutlinePhone className=" text-xl text-gray-700" />
            <div className="  w-[300px] rounded-md h-10 md:w-[500px] bg-slate-200 animate-pulse "></div>
          </div>
        </div>
        <div className=" flex items-start gap-8">
          <div className=" flex items-center gap-8">
            <AiOutlineMail className=" text-xl text-gray-700" />
            <div className="    w-[300px] rounded-md h-10 md:w-[500px] bg-slate-200 animate-pulse"></div>
          </div>
        </div>
        <div className=" flex items-start gap-8">
          <div className=" flex items-center gap-8">
            <FaRegAddressCard className=" text-xl text-gray-700" />
            <div className="w-[300px] rounded-md h-10 md:w-[500px] bg-slate-200 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLoading;
