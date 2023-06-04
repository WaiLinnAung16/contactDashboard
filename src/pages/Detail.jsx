import React, { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa";
import { BsArrowLeft, BsQuestionCircle } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteContactMutation,
  useGetSingleContactQuery,
} from "../redux/api/contactApi";
import DeleteModal from "../components/DeleteModal";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { Toaster, toast } from "react-hot-toast";

const Detail = () => {
  const { id } = useParams();
  const { token } = useSelector((store) => store.authSlice);
  const { data: contact, isLoading } = useGetSingleContactQuery({ id, token });
  const [deleteContact] = useDeleteContactMutation();

  const navigate = useNavigate();

  const [toggleDelModal, setToggleDelModal] = useState(false);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const date = new Date(dateString);
    return date.toLocaleString("en-US", options);
  };

  if (isLoading) {
    return <Spinner />;
  }

  //delete contact
  const deleteContactHandler = async (id) => {
    setToggleDelModal(!toggleDelModal);
    await toast.promise(deleteContact({ id, token }), {
      loading: "Working...",
      success: "Successfully deleted",
      error: "Something wrong!",
    });

    setTimeout(() => {
      navigate("/");
    }, 900);
  };

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      {toggleDelModal && (
        <DeleteModal
          toggleDelModal={toggleDelModal}
          setToggleDelModal={setToggleDelModal}
          deleteContactHandler={deleteContactHandler}
          id={id}
        />
      )}
      <div>
        <div className="border-b top-20 bg-white w-full z-10 ">
          <div className=" w-full lg:w-[70%] p-5 flex justify-between flex-col md:flex-row">
            <div className=" flex flex-col md:flex-row items-center gap-5 md:gap-10 ">
              <button
                className=" self-start text-xl cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <BsArrowLeft />
              </button>
              <img
                className=" w-[150px] h-[150px] rounded-full"
                src="https://www.gstatic.com/identity/boq/profilepicturepicker/photo_silhouette_e02a5f5deb3ffc173119a01bc9575490.png"
                alt=""
              />
              <div className=" flex flex-col items-center gap-3">
                <h1 className=" text-xl font-medium text-gray-600">
                  {contact?.contact?.name}
                </h1>
                <button className="hover:bg-gray-200 flex gap-3 items-center border border-gray-400 px-2 py-1 text-sm rounded-lg">
                  <span className=" text-lg text-blue-700 cursor-pointer">
                    <AiOutlinePlus />
                  </span>
                  Label
                </button>
              </div>
            </div>
            <div className=" flex justify-center items-center gap-3 mt-5 md:self-end">
              <button
                onClick={() => navigate(`/update/${id}`)}
                className=" btn"
              >
                Edit
              </button>
              <button
                onClick={() => setToggleDelModal(!toggleDelModal)}
                className="text-lg text-red-500 border border-red-500 px-4 py-2 rounded-md transition hover:bg-red-500 hover:text-white hover:opacity-70"
              >
                <BiTrash />
              </button>
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
                <AiOutlineMail className=" text-xl" /> {contact?.contact?.email}
              </p>
              <p className=" flex items-center gap-3 text-blue-500">
                <AiOutlinePhone className=" text-xl" />{" "}
                {contact?.contact?.phone}
              </p>
              <p className=" flex items-center gap-3 text-blue-500">
                <FaRegAddressCard className=" text-xl" />{" "}
                {contact?.contact?.address}
              </p>
            </div>
          </div>
          <div className=" space-y-3 flex-[2]">
            <h4 className=" flex items-center gap-3 text-gray-500 text-lg font-medium">
              History
              <BsQuestionCircle />
            </h4>
            <p className=" text-gray-500 text-sm">
              Last edited • {formatDate(contact?.contact.updated_at)}
            </p>
            <p className=" text-gray-500 text-sm">
              Created at • {formatDate(contact?.contact.created_at)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
