import React, { useEffect, useRef, useState } from "react";


const DeleteModal = ({
  toggleDelModal,
  setToggleDelModal,
  deleteContactHandler,
  id,
}) => {

  const closeModal = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setToggleDelModal(!toggleDelModal);
    }
  };

  
  return (
    <div
      onClick={closeModal}
      className="backdrop select-none bg-[#00000020] flex justify-center items-center h-screen fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0  max-h-full"
    >
      <div className="relative w-full max-w-2xl max-h-full ">
        <div className="relative bg-white rounded-lg max-w-[500px] mx-auto shadow">
          <div className=" p-4 space-y-4">
            <h1 className=" text-lg font-medium">Delete from contact ?</h1>
            <p className=" text-sm text-gray-500">
              This contact will be permanently deleted from this account.
            </p>
            <div className=" flex items-center gap-4 justify-end">
              <button
                onClick={() => setToggleDelModal(!toggleDelModal)}
                className="cancel-btn px-5 py-2 text-gray-400 bg-gray-100 rounded-md text-sm font-medium hover:bg-gray-200"
              >
                Cancel
              </button>
              <button className="del-btn btn" 
              onClick={()=> deleteContactHandler(id)}
              >
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
