import Cookies from "js-cookie";
import React from "react";
import { useGetContactQuery } from "../redux/api/contactApi";

const Contacts = () => {
 
  const token = Cookies.get("token");
  const {data} = useGetContactQuery(token);
  
  return <div className="text-sm text-gray-500">
    <h1 className="my-5">Contacts<span>({data?.contacts?.data.length})</span></h1>
   <table className="w-full">
   <thead className="">
        <tr>
          <th></th>
          <th className="text-start">Name</th>
          <th className="text-start">Email</th>
          <th className="text-start">Phone</th>
          <th className="text-start">Address</th>
        </tr>
      </thead>
      <tbody>
      {data?.contacts?.data?.map(contact => {
          return <tr>
            <td className="py-3 "><img src={contact.img?contact.img:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} className="rounded-full h-[50px] w-[50px]"/></td>
            <td className="py-3">{contact.name}</td>
            <td className="py-3">{contact.email?contact.email : "example@gmail.com"}</td>
            <td className="py-3">{contact.phone}</td>
            <td className="py-3">{contact.address ? contact.address : "Myanmar"}</td>
          </tr>
        })}
      </tbody>
   </table>
  </div>
};

export default Contacts;
