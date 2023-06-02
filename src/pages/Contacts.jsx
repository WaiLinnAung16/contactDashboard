import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import {
  useDeleteContactMutation,
  useGetContactQuery,
} from "../redux/api/contactApi";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../redux/services/contactSlice";
import Spinner from "../components/Spinner";

const Contacts = () => {
  const token = Cookies.get("token");
  const { data, isLoading } = useGetContactQuery(token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { contacts } = useSelector((store) => store.contactSlice);
  const { searchTerm } = useSelector((store) => store.contactSlice);

  const [deleteContact] = useDeleteContactMutation();

  const deleteHandler = async (id) => {
    const data = await deleteContact({ id, token });
  };

  const [toggleModel, setToggleModal] = useState(false);

  useEffect(() => {
    dispatch(getContacts(data?.contacts?.data));
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  if(!data?.contacts?.data.length){
    return (
      <div className=" flex flex-col gap-5 justify-center items-center h-screen">
        <h1 className=" text-2xl font-medium">There is no contact</h1>
        <button onClick={()=> navigate(`/create`)} className=" btn">Create contact</button>
      </div>
    )
  }

  return (
    <>
      <div className="text-sm text-gray-500">
        <h1 className="my-5 pl-5">
          Contacts<span>({data?.contacts?.data.length})</span>
        </h1>
        <table className="w-full">
          <thead className="">
            <tr>
              <th></th>
              <th className="text-start ">Name</th>
              <th className="text-start md:visible invisible">Email</th>
              <th className="text-start  md:visible invisible">Phone</th>
              <th className="text-start  md:visible invisible">Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contacts
              ?.filter((contact) =>
                contact.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((contact) => {
                return (
                  <tr
                    key={contact.id}
                    onClick={() => navigate(`/detail/${contact.id}`)}
                    className="transition-all duration-300 group/item hover:bg-gray-100 cursor-pointer"
                  >
                    
                    <td className="py-3 flex justify-center">
                      <h1 className="w-[35px] h-[35px] bg-blue-700 text-white flex justify-center items-center rounded-full">
                        {contact.name.split("")[0].toUpperCase()}
                      </h1>
                    </td>
                    <td className="py-3">{contact.name}</td>
                    <td className="py-3  md:visible invisible">
                      {contact.email ? contact.email : "example@gmail.com"}
                    </td>
                    <td className="py-3  md:visible invisible">
                      {contact.phone}
                    </td>
                    <td className="py-3  md:visible invisible">
                      {contact.address ? contact.address : "Myanmar"}
                    </td>
                    <td className="invisible md:visible ">
                      <div className="text-xl md:flex gap-5 items-center cursor-pointer hidden">
                        <BiEditAlt
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/update/${contact.id}`);
                          }}
                          className=" edit-btn transition hover:opacity-80"
                        />

                        <BiTrash
                          className=" transition hover:opacity-80"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteHandler(contact.id)
                        
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Contacts;
