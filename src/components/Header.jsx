import React from "react";

const Header = () => {
  return (
    <div className="bg-slate-50 flex items-center py-3 sticky top-0 px-5">
      <div className="w-[300px]">Contacts</div>

      <div className="flex-1">
        <input
          type="text"
          placeholder="Search..."
          className="py-2 px-4 bg-slate-500"
        />
      </div>
      <div className="flex gap-5">
        <div className="w-10 h-10 bg-slate-500 rounded-full"></div>
        <div className="w-10 h-10 bg-slate-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default Header;
