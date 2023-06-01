import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteContactMutation,
  useGetSingleContactQuery,
} from "../redux/api/contactApi";
import DeleteModal from "../components/DeleteModal";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const Detail = () => {
  const { id } = useParams();
  const { token } = useSelector((store) => store.authSlice);
  const { data: contact } = useGetSingleContactQuery({ id, token });
  const [deleteContact] = useDeleteContactMutation();

  const navigate = useNavigate();

  const [toggleDelModal, setToggleDelModal] = useState(false);
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      {toggleDelModal && (
        <DeleteModal
          toggleDelModal={toggleDelModal}
          setToggleDelModal={setToggleDelModal}
          deleteContact={deleteContact}
          id={id}
        />
      )}
      <div className=" md:w-[65%] w-full mx-auto">
        <div className="border-b top-20 bg-white w-full z-10">
          <div className=" w-full p-5 flex justify-between flex-col md:flex-row">
            <div className=" flex flex-col md:flex-row items-center gap-5 md:gap-10 ">
              <button
                className=" self-start text-xl cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <RxCross2 />
              </button>
              <img
                className=" w-[150px] h-[150px] rounded-full"
                src="https://www.gstatic.com/identity/boq/profilepicturepicker/photo_silhouette_e02a5f5deb3ffc173119a01bc9575490.png"
                alt=""
              />
              <button className="hover:bg-gray-200 flex gap-3 items-center border border-gray-400 px-2 py-1 text-sm rounded-lg">
                <span className=" text-lg text-blue-700 cursor-pointer">
                  <AiOutlinePlus />
                </span>
                Label
              </button>
            </div>
            <div className=" flex items-center gap-5 self-center md:self-end mt-5">
              <button onClick={()=> setToggleDelModal(!toggleDelModal)} className="hover:scale-110 transition-all text-xl text-red-500">
                <BiTrash />
              </button>
              <button
                onClick={() => navigate(`/update/${id}`)}
                className=" btn"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className=" m-10 flex flex-col md:flex-row items-center gap-10">
          <div className=" border rounded-lg p-4 flex-[3]">
            <h4 className=" text-lg mb-4 font-medium text-gray-500">
              Contact details
            </h4>
            <div className=" space-y-3">
              <p className=" flex items-center gap-3 text-blue-500">
                <AiOutlineMail className=" text-xl" /> mgmyonyi@gmail.com
              </p>
              <p className=" flex items-center gap-3 text-blue-500">
                <AiOutlinePhone className=" text-xl" /> 0923482428
              </p>
              <p className=" flex items-center gap-3 text-blue-500">
                <FaRegAddressCard className=" text-xl" /> yangon
              </p>
            </div>
          </div>
          <div className=" space-y-3 flex-[2]">
            <h4 className=" flex items-center gap-3 text-gray-500 text-lg font-medium">
              History
              <BsQuestionCircle />
            </h4>
            <p className=" text-gray-500 text-sm">
              Last edited•Yesterday, 15:34
            </p>
            <p className=" text-gray-500 text-sm">
              Added to contacts•Yesterday, 15:34
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
