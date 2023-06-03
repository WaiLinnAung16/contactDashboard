import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({ isLoading }) => {
  return (
    <div className=" flex justify-center items-center h-screen bg-[#00000020]">
      <ClipLoader
        color={"#000"}
        loading={isLoading}
        size={35}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
