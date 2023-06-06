import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineUser,
  AiOutlinePlus,
} from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import { Toaster, toast } from "react-hot-toast";
import {
  useGetSingleContactQuery,
  useUpdateContactMutation,
} from "../redux/api/contactApi";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { BsArrowLeft } from "react-icons/bs";

const Update = () => {
  const { id } = useParams();
  const [toggleModal, setToggleModal] = useState(false);
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState("");
  const { token } = useSelector((store) => store.authSlice);

  const [updateContact, { isLoading: isUpdateLoading }] =
    useUpdateContactMutation();
  const { data: contact, isLoading } = useGetSingleContactQuery({ id, token });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [formError, setFormError] = useState({});

  useEffect(() => {
    setName(contact?.contact.name);
    setPhone(contact?.contact.phone);
    setEmail(contact?.contact.email);
    setAddress(contact?.contact.address);
  }, [contact]);

  const validate = (values) => {
    let isValid = true;
    const errors = {};
    if (!values.name) {
      isValid = false;
      errors.name = "Name is a required field";
    }
    if (!values.email) {
      isValid = false;
      errors.email = "Email is a required field";
    } else if (!values.email.match(/^\S+@\S+$/)) {
      isValid = false;
      errors.email = "Invalid email";
    }

    if (!values.phone) {
      isValid = false;
      errors.phone = "Phone is a required field";
    } else if (values.phone.length < 8) {
      isValid = false;
      errors.phone = "Phone must be greater than 8";
    }

    if (!values.address) {
      isValid = false;
      errors.address = "Address is a required field";
    }
    setFormError(errors);
    return isValid;
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const userData = { name, phone, email, address };
      if (validate(userData)) {
        const data = await toast.promise(
          updateContact({ id, userData, token }),
          {
            loading: "Working...",
            success: "Update Contact Success",
            error: "Somthing Wrong!",
          }
        );
        console.log(data);
        setTimeout(() => {
          navigate(`/detail/${id}`);
        }, 900);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(formError);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      {toggleModal && (
        <Modal
          toggleModal={toggleModal}
          setToggleModal={setToggleModal}
          setProfileImg={setProfileImg}
        />
      )}
      <div>
        <div className="border-b top-16 bg-white fixed w-full z-20">
          <div className="flex flex-col w-full md:w-[50%] p-5">
            <div className="flex flex-col items-center md:flex-row gap-5">
              <button
                className=" self-start text-xl cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <BsArrowLeft />
              </button>
              {profileImg ? (
                <img
                  src={profileImg}
                  className=" w-[150px] h-[150px] object-cover rounded-full"
                />
              ) : (
                <div
                  onClick={() => setToggleModal(!toggleModal)}
                  className=" w-[150px] h-[150px] flex items-center justify-center bg-sky-200 rounded-full"
                >
                  <MdOutlineAddPhotoAlternate className=" text-3xl" />
                </div>
              )}
              <div className="flex flex-col items-center md:items-start gap-2">
                <h1 className=" text-xl font-medium text-gray-600">
                  {contact?.contact?.name}
                </h1>
                <button className="hover:bg-gray-200 flex gap-3 items-center border border-gray-400 px-2 py-1 text-sm rounded-lg">
                  <span className=" text-lg text-blue-700 cursor-pointer">
                    <AiOutlinePlus />
                  </span>
                  Label
                </button>
              </div>
            </div>
            <button
              form="create-form"
              type="submit"
              className="md:self-end md:m-0 self-center mt-5 px-6 py-2 text-sm bg-blue-700 text-white rounded-md"
              disabled={isUpdateLoading ? true : false}
            >
              Save
            </button>
          </div>
        </div>

        <form id="create-form" onSubmit={submitHandler}>
          <div className=" m-10 space-y-8 mt-[430px] md:mt-[280px]">
            <div className=" flex items-start gap-8">
              <AiOutlineUser className=" mt-4 text-xl text-gray-700" />
              <div className="w-[300px] md:w-[500px]">
                <div className="relative">
                  <input
                    onChange={(e) => setName(e.target.value)}
                    defaultValue={name}
                    type="text"
                    className={`${
                      formError?.name
                        ? "border-red-500 text-red-500"
                        : "border-neutral-500 text-gray-900"
                    } block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-[1px] focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    autoFocus
                  />
                  <label
                    htmlFor="name"
                    className={`${
                      formError?.name ? "text-red-500" : "text-gray-900 "
                    } absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
                  >
                    Name
                  </label>
                </div>
                {formError?.name && (
                  <small className=" text-red-500">{formError?.name}</small>
                )}
              </div>
            </div>
            <div className=" flex items-start gap-8">
              <div className=" mt-4">
                <AiOutlinePhone className=" text-xl text-gray-700" />
              </div>
              <div className=" flex flex-col w-[300px] md:w-[500px] gap-2">
                <div className="relative">
                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    defaultValue={phone}
                    type="text"
                    className={`${
                      formError?.phone
                        ? "border-red-500 text-red-500"
                        : "border-neutral-500 text-gray-900"
                    } block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-[1px] focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=" "
                  />
                  <label
                    htmlFor="phone"
                    className={`${
                      formError?.phone ? "text-red-500" : "text-gray-900 "
                    } absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
                  >
                    Phone
                  </label>
                </div>
                {formError?.phone && (
                  <small className=" text-red-500">{formError?.phone}</small>
                )}
              </div>
            </div>
            <div className=" flex items-start gap-8">
              <div className="mt-4">
                <AiOutlineMail className=" text-xl text-gray-700" />
              </div>
              <div className=" flex flex-col gap-2  w-[300px] md:w-[500px]">
                <div className="relative">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    defaultValue={email}
                    type="text"
                    className={`${
                      formError?.email
                        ? "border-red-500 text-red-500"
                        : "border-neutral-500 text-gray-900"
                    } block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-[1px] focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className={`${
                      formError?.email ? "text-red-500" : "text-gray-900 "
                    } absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
                  >
                    Email
                  </label>
                </div>
                {formError?.email && (
                  <small className=" text-red-500">{formError?.email}</small>
                )}
              </div>
            </div>
            <div className=" flex items-start gap-8">
              <div className="mt-4">
                <FaRegAddressCard className=" text-xl text-gray-700" />
              </div>
              <div className="w-[300px] md:w-[500px]">
                <div className="relative">
                  <input
                    onChange={(e) => setAddress(e.target.value)}
                    defaultValue={address}
                    type="text"
                    className={`${
                      formError?.address
                        ? "border-red-500 text-red-500"
                        : "border-neutral-500 text-gray-900"
                    } block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-[1px] focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=" "
                  />
                  <label
                    htmlFor="address"
                    className={`${
                      formError?.address ? "text-red-500" : "text-gray-900 "
                    } absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
                  >
                    Address
                  </label>
                </div>
                {formError?.address && (
                  <small className=" text-red-500">{formError?.address}</small>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Update;
