import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import {
  useDeleteContactMutation,
  useGetContactQuery,
} from "../redux/api/contactApi";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getContacts,
  getFrequent,
  removeFrequent,
} from "../redux/services/contactSlice";
import { AiOutlineUser } from "react-icons/ai";
import Spinner from "../components/Spinner";
import DeleteModal from "../components/DeleteModal";
import ContactLoading from "../components/Skeleton/ContactLoading";

const Contacts = () => {
  const token = Cookies.get("token");
  const { data, isLoading } = useGetContactQuery(token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { contacts } = useSelector((store) => store.contactSlice);
  const { searchTerm } = useSelector((store) => store.contactSlice);
  const [deleteContact] = useDeleteContactMutation();

  const [selectedContactId, setSelectedContactId] = useState(null);

  const deleteContactHandler = async (id) => {
    await deleteContact({ id, token });
    setSelectedContactId(null);
    dispatch(removeFrequent(id));
  };

  useEffect(() => {
    dispatch(getContacts(data?.contacts?.data));
  }, [data]);

  if (isLoading) {
    return <ContactLoading />;
  }

  if (!data?.contacts?.data.length) {
    return (
      <>
        <div
          onClick={() => navigate("/create")}
          className=" fixed bottom-8 right-8 md:hidden p-3 rounded-full cursor-pointer"
          style={{
            boxShadow:
              "0 1px 3px 0 rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36">
            <path fill="#34A853" d="M16 16v14h4V20z"></path>
            <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
            <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
            <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
            <path fill="none" d="M0 0h36v36H0z"></path>
          </svg>
        </div>
        <div className=" flex flex-col gap-5 justify-center items-center h-screen">
          <img
            className=" w-[250px]"
            src="https://ssl.gstatic.com/social/contactsui/images/emptycontacts/emptycontacts_animation_cell4.png"
            alt=""
          />
          <h1 className=" text-lg">No contacts yet</h1>
          <button
            onClick={() => navigate(`/create`)}
            className=" flex gap-2 items-center text-sm text-blue-500 font-medium rounded-md px-4 py-2 hover:bg-blue-50"
          >
            <AiOutlineUser className=" text-lg" />
            Create contact
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="text-sm text-gray-700 overflow-hidden px-5">
        <h1 className="text-center md:text-start my-5 text-lg">
          Contacts<span>({data?.contacts?.data.length})</span>
        </h1>
        <div
          onClick={() => navigate("/create")}
          className=" fixed bottom-8 right-8 md:hidden p-3 rounded-full cursor-pointer"
          style={{
            boxShadow:
              "0 1px 3px 0 rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36">
            <path fill="#34A853" d="M16 16v14h4V20z"></path>
            <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
            <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
            <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
            <path fill="none" d="M0 0h36v36H0z"></path>
          </svg>
        </div>
        <table className="w-full">
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
            {contacts
              ?.filter((contact) =>
                contact.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((contact) => {
                return (
                  <tr
                    key={contact.id}
                    onClick={(e) => {
                      if (e.target.classList.contains("row")) {
                        navigate(`/detail/${contact.id}`);
                        dispatch(getFrequent(contact));
                      }
                    }}
                    className="row transition-all duration-100 group/item mb-5 hover:text-black hover:bg-gray-100 cursor-pointer "
                  >
                    <td className="row py-3 mr-3 md:m-0 flex gap-4 items-center ">
                      <div>
                        <h1 className="row w-[35px] h-[35px] bg-blue-700 text-white flex justify-center items-center rounded-full">
                          {contact?.name.split("")[0].toUpperCase()}
                        </h1>
                      </div>

                      <span className="row">
                        {contact?.name?.length < 15
                          ? contact?.name
                          : contact?.name.slice(0, 15) + "..."}
                      </span>
                    </td>

                    <td className="row py-3 hidden md:table-cell">
                      {contact?.email?.length < 25
                        ? contact?.email
                        : contact?.email.slice(0, 25) + "..."}
                    </td>
                    <td className="row py-3 hidden md:table-cell">
                      {contact?.phone}
                    </td>
                    <td className="row py-3 hidden md:table-cell">
                      {contact?.address ? contact.address : "Myanmar"}
                    </td>
                    <td className="row hidden md:table-cell">
                      <div className="text-xl md:flex gap-5 items-center cursor-pointer hidden">
                        <BiEditAlt
                          onClick={() => {
                            navigate(`/update/${contact.id}`);
                          }}
                          className=" edit-btn transition hover:opacity-80"
                        />
                        <BiTrash
                          className="del-btn transition hover:opacity-80"
                          onClick={() => {
                            setSelectedContactId(contact.id);
                          }}
                        />

                        {selectedContactId && (
                          <DeleteModal
                            toggleDelModal={true}
                            setToggleDelModal={setSelectedContactId}
                            deleteContactHandler={deleteContactHandler}
                            id={selectedContactId}
                          />
                        )}
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
