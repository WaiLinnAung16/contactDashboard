import Cookies from "js-cookie";
import React from "react";
import {
  useDeleteContactMutation,
  useGetContactQuery,
} from "../redux/api/contactApi";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

const Contacts = () => {
  const token = Cookies.get("token");
  const { data } = useGetContactQuery(token);

  const [deleteContact] = useDeleteContactMutation();

  const deleteHandler = async (id) => {
    const data = await deleteContact({ id, token });
  };

  return (
    <div className="text-sm text-gray-500">
      <h1 className="my-5 pl-5">
        Contacts<span>({data?.contacts?.data.length})</span>
      </h1>
      <table className="w-full">
        <thead className="">
          <tr>
            <th></th>
            <th className="text-start">Name</th>
            <th className="text-start">Email</th>
            <th className="text-start">Phone</th>
            <th className="text-start">Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.contacts?.data?.map((contact) => {
            return (
              <tr
                className="transition-all duration-300 group/item hover:bg-gray-100 cursor-pointer "
                key={contact.id}
              >
                <td className="py-3 flex justify-center">
                  <div className="w-[35px] h-[35px] bg-blue-700 text-white flex justify-center items-center rounded-full">
                    {contact.name.split("")[0].toUpperCase()}
                  </div>
                </td>
                <td className="py-3">{contact.name}</td>
                <td className="py-3">
                  {contact.email ? contact.email : "example@gmail.com"}
                </td>
                <td className="py-3">{contact.phone}</td>
                <td className="py-3">
                  {contact.address ? contact.address : "Myanmar"}
                </td>
                <td>
                  <div className="text-xl flex gap-5 items-center cursor-pointer invisible transition duration-200 group-hover/item:visible">
                    <Link to={`detail/${contact.id}`}>
                      <BiEditAlt className=" transition hover:opacity-80" />
                    </Link>

                    <BiTrash
                      className=" transition hover:opacity-80"
                      onClick={() => deleteHandler(contact?.id)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Contacts;
