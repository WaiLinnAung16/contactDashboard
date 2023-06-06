import React from "react";

const ContactLoading = () => {
  return (
    <div className="px-5">
      <h1 className="text-center md:text-start my-5 text-lg">Contacts( )</h1>
      <table className="w-full text-gray-700">
        <thead>
          <tr>
            <th className="text-start hidden md:table-cell">Name</th>
            <th className="text-start hidden md:table-cell">Email</th>
            <th className="text-start hidden md:table-cell">Phone</th>
            <th className="text-start hidden md:table-cell">Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={4} className="bg-slate-200 h-10 animate-pulse"></td>
          </tr>
          <div className="py-1"></div>
          <tr>
            <td colSpan={4} className="bg-slate-200 h-10 animate-pulse"></td>
          </tr>
          <div className="py-1"></div>
          <tr>
            <td colSpan={4} className="bg-slate-200 h-10 animate-pulse"></td>
          </tr>
          <div className="py-1"></div>
          <tr>
            <td colSpan={4} className="bg-slate-200 h-10 animate-pulse"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ContactLoading;
