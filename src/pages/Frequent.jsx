import React from "react";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFrequent, removeFrequent } from "../redux/services/contactSlice";
import { Toaster, toast } from "react-hot-toast";

const Frequent = () => {
  const { frequent } = useSelector((store) => store.contactSlice);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((store) => store.contactSlice);

  if (!frequent.length) {
    return (
      <>
        <div className=" p-5 space-y-5">
          <h4 className=" uppercase text-xs text-gray-500 font-medium">
            FREQUENTLY CONTACTED
          </h4>
          <h1>People you contact the most will appear here</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="text-sm text-gray-500 overflow-hidden px-5">
        <h1 className="my-5">
          Frequent contacts<span>({frequent.length})</span>
        </h1>
        <table className="w-full">
          <thead>
            <tr>
              <th></th>
              <th className="text-start">Name</th>
              <th className="text-start invisible md:visible">Email</th>
              <th className="text-start invisible md:visible">Phone</th>
              <th className="text-start invisible md:visible">Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {frequent
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
                    className="row transition-all duration-300 group/item hover:bg-gray-100 cursor-pointer"
                  >
                    <td className="row py-3 mr-3 md:m-0 flex justify-center">
                      <h1 className="row w-[35px] h-[35px] bg-blue-700 text-white flex justify-center items-center rounded-full">
                        {contact.name.split("")[0].toUpperCase()}
                      </h1>
                    </td>
                    <td className="row py-3">{contact.name}</td>
                    <td className="row py-3 invisible md:visible">
                      {contact.email ? contact.email : "example@gmail.com"}
                    </td>
                    <td className="row py-3 invisible md:visible">
                      {contact.phone}
                    </td>
                    <td className="row py-3 invisible md:visible">
                      {contact.address ? contact.address : "Myanmar"}
                    </td>
                    <td className="row invisible md:visible">
                      <div className="text-xl md:flex gap-5 items-center cursor-pointer hidden">
                        <BiEditAlt
                          onClick={(e) => {
                            navigate(`/update/${contact.id}`);
                          }}
                          className=" edit-btn transition hover:opacity-80"
                        />

                        <BiTrash
                          className="del-btn transition hover:opacity-80"
                          onClick={(e) => {
                            dispatch(removeFrequent(contact));
                            toast.success("frequent contact deleted");
                          }}
                        />
                        <Toaster
                          toastOptions={{
                            className: " text-sm",
                          }}
                          position="bottom-center"
                          reverseOrder={false}
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

export default Frequent;
