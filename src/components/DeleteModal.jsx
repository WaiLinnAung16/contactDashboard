import React, { useRef } from "react";
import ToastAlert from "./ToastAlert";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DeleteModal = ({
  toggleDelModal,
  setToggleDelModal,
  deleteContact,
  id,
}) => {
  const { token } = useSelector((store) => store.authSlice);
  const nav = useNavigate();
  const closeModal = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setToggleDelModal(!toggleDelModal);
    }
  };

  const deleteContactHandler = async () => {
    const { data } = await deleteContact({ id, token });
    console.log(data);
    if (data?.success) {
      setToggleDelModal(!toggleDelModal);
      toast.custom(<ToastAlert title={"delete success"} />);
      nav("/")
    }
  };
  return (
    <div
      onClick={closeModal}
      className="backdrop select-none bg-[#00000005] flex justify-center items-center fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0  max-h-full"
    >
      <div className="relative w-full max-w-2xl max-h-full ">
        <div className="relative bg-white rounded-lg w-[500px] mx-auto">
          <div className=" p-4 space-y-4">
            <h1 className=" text-lg font-medium">Delete from contact ?</h1>
            <p className=" text-sm text-gray-500">
              This contact will be permanently deleted from this account.
            </p>
            <div className=" flex items-center gap-4 justify-end">
              <button
                onClick={() => setToggleDelModal(!toggleDelModal)}
                className="px-5 py-2 text-gray-400 bg-gray-100 rounded-md text-sm font-medium hover:bg-gray-200"
              >
                Cancel
              </button>
              <button className="btn" onClick={deleteContactHandler}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
