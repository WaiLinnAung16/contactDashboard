import React, { useEffect } from "react";

const ToastAlert = ({ title }) => {
  return (
    <div className=" bg-black text-white px-4 py-2 rounded text-sm">
      {title}
    </div>
  );
};

export default ToastAlert;
