import React, { useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineComputer } from "react-icons/md";

const Modal = ({ toggleModal, setToggleModal, setProfileImg }) => {
  const fileRef = useRef(null);
  const closeModal = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setToggleModal(!toggleModal);
    }
  };

  const readFileHandler = (e) => {
    // console.log(e.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      setProfileImg(e.target.result);
    });
    reader.readAsDataURL(e.target.files[0]);
    setToggleModal(!toggleModal);
  };

  const uploadFileHandler = (e) => {
    e.preventDefault();
    // console.log(e.dataTransfer.files[0]);
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      setProfileImg(e.target.result);
    });
    reader.readAsDataURL(e.dataTransfer.files[0]);
    setToggleModal(!toggleModal);
  };
  return (
    <div
      onClick={closeModal}
      className="backdrop select-none bg-[#00000060] flex justify-center items-center h-screen fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0  max-h-full"
    >
      <div className="relative w-full max-w-2xl max-h-full ">
        <div className="relative bg-white rounded-lg shadow ">
          <div className=" flex justify-between p-4 border-b rounded-t">
            <button
              onClick={() => setToggleModal(!toggleModal)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5"
            >
              <RxCross2 className=" text-xl" />
            </button>
            <h3 className="text-xl text-gray-500">Choose Picture</h3>

            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5"
            >
              <BsThreeDotsVertical className="text-xl" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className=" flex flex-col items-center gap-4">
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={uploadFileHandler}
              >
                <img
                  className=" w-[175px]"
                  src="https://www.gstatic.com/identity/boq/profilepicturepicker/photo_silhouette_e02a5f5deb3ffc173119a01bc9575490.png"
                  alt=""
                />
              </div>

              <h1 className=" text-2xl text-gray-500">Drag photo here</h1>
              <button
                onClick={() => fileRef.current.click()}
                className=" flex items-center gap-2 text-blue-400 bg-white hover:bg-gray-100 focus:outline-none rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-blue-700 focus:z-10 "
              >
                <MdOutlineComputer className=" text-2xl" />
                Upload from computer
              </button>
              <input
                type="file"
                onChange={readFileHandler}
                ref={fileRef}
                name=""
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
