import React from "react";
import { AiOutlineMail, AiOutlinePhone, AiOutlinePlus } from "react-icons/ai";
import { BsArrowLeft, BsQuestionCircle } from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa";

const DetailLoading = () => {
  return (
    <div>
      <div className="border-b top-20 bg-white w-full z-10 ">
        <div className=" w-full lg:w-[70%] p-5 flex justify-between flex-col md:flex-row">
          <div className=" flex flex-col md:flex-row items-center gap-5 md:gap-10 ">
            <button className=" self-start text-xl cursor-pointer">
              <BsArrowLeft />
            </button>
            <img
              className=" w-[150px] h-[150px] rounded-full"
              src="https://www.gstatic.com/identity/boq/profilepicturepicker/photo_silhouette_e02a5f5deb3ffc173119a01bc9575490.png"
              alt=""
            />
            <div className=" flex flex-col items-center md:items-start gap-3">
              <h1 className="w-20 h-5 bg-slate-200"></h1>
              <button className="hover:bg-gray-200 flex gap-3 items-center border border-gray-400 px-2 py-1 text-sm rounded-lg">
                <span className=" text-lg text-blue-700 cursor-pointer">
                  <AiOutlinePlus />
                </span>
                Label
              </button>
            </div>
          </div>
          <div className=" flex justify-center items-center gap-3 mt-5 md:self-end">
            <button className="w-16 h-9 bg-slate-200 animate-pulse rounded"></button>
            <button className="w-16 h-9 bg-slate-200 animate-pulse rounded"></button>
          </div>
        </div>
      </div>
      <hr />
      <div className="m-5 md:m-10 flex flex-col md:flex-row md:items-center items-start gap-10">
        <div className=" border rounded-lg p-4 flex-[2] w-full">
          <h4 className=" text-lg mb-4 font-medium text-gray-500">
            Contact details
          </h4>
          <div className=" space-y-3">
            <p className=" flex items-center gap-3 text-blue-500">
              <AiOutlineMail className=" text-xl" />
              <div
                className="w-40 h-5 animate-pulse
               bg-slate-200"
              ></div>
            </p>
            <p className=" flex items-center gap-3 text-blue-500">
              <AiOutlinePhone className=" text-xl" />
              <div
                className="w-40 h-5 animate-pulse
               bg-slate-200"
              ></div>
            </p>
            <p className=" flex items-center gap-3 text-blue-500">
              <FaRegAddressCard className=" text-xl" />
              <div
                className="w-40 h-5 animate-pulse
               bg-slate-200"
              ></div>
            </p>
          </div>
        </div>
        <div className=" space-y-3 flex-[2]">
          <h4 className=" flex items-center gap-3 text-gray-500 text-lg font-medium">
            History
            <BsQuestionCircle />
          </h4>
          <p className=" text-gray-500 text-sm flex gap-2">
            Last edited •{" "}
            <div
              className="w-40 h-5 animate-pulse
               bg-slate-200"
            ></div>
          </p>
          <p className=" text-gray-500 text-sm flex gap-2">
            Created at •{" "}
            <div
              className="w-40 h-5 animate-pulse
               bg-slate-200"
            ></div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailLoading;
