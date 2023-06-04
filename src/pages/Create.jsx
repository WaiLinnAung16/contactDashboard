import React, { useState } from "react";
import {
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineUser,
  AiOutlinePlus,
} from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { useFormik } from "formik";
import { useCreateContactMutation } from "../redux/api/contactApi";
import { Toaster, toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import * as Yup from "yup";

const userSchema = Yup.object().shape({
  name: Yup.string().min(3).max(50).required(),
  phone: Yup.string().required(),
  email: Yup.string().email().required(),
  address: Yup.string().required(),
});

const Create = () => {
  const [toggleModal, setToggleModal] = useState(false);
  const navigate = useNavigate();
  const [createContact, { isLoading }] = useCreateContactMutation();
  const [profileImg, setProfileImg] = useState("");
  const { token } = useSelector((store) => store.authSlice);

  // formik
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },

    validationSchema: userSchema,

    onSubmit: async (values, actions) => {
      await toast.promise(createContact({ userData: values, token }), {
        loading: "Working...",
        success: "Create Contact Success",
        error: "Somthing Wrong!",
      });

      setTimeout(() => {
        actions.resetForm();
        navigate("/");
      }, 900);
    },
  });

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
        <div className="border-b top-20 bg-white fixed w-full z-20">
          <div className="flex flex-col w-full  md:w-[50%] p-5">
            <div className=" flex flex-col md:flex-row items-center gap-5 md:gap-10 ">
              <button
                className=" self-start text-xl cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <RxCross2 />
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
              <button className="hover:bg-gray-200 flex gap-3 items-center border border-gray-400 px-2 py-1 text-sm rounded-lg">
                <span className=" text-lg text-blue-700 cursor-pointer">
                  <AiOutlinePlus />
                </span>
                Label
              </button>
            </div>
            <button
              form="create-form"
              type="submit"
              className="md:self-end md:m-0 self-center mt-5 text-sm px-7 py-2 bg-blue-700 text-white rounded-md"
              disabled={isLoading ? true : false}
            >
              Save
            </button>
          </div>
        </div>

        <form id="create-form" onSubmit={formik.handleSubmit}>
          <div className=" m-10 space-y-8 mt-[400px] md:mt-[280px]">
            <div className=" flex items-start gap-8">
              <AiOutlineUser className=" mt-4 text-xl text-gray-700" />
              <div className="w-[300px] md:w-[500px]">
                <div className="relative">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    type="text"
                    id="name"
                    name="name"
                    className={`${
                      formik.errors.name &&
                      formik.touched.name &&
                      "border-red-500 text-red-500"
                    } block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-md border-[1px] border-neutral-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    autoFocus
                  />
                  <label
                    htmlFor="name"
                    className={`${
                      formik.errors.name &&
                      formik.touched.name &&
                      " text-red-500"
                    } absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
                  >
                    Name
                  </label>
                </div>
                {formik.errors.name && formik.touched.name && (
                  <small className=" text-red-500">{formik.errors.name}</small>
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    type="number"
                    id="phone"
                    name="phone"
                    className={`${
                      formik.errors.phone &&
                      formik.touched.phone &&
                      "border-red-500 text-red-500"
                    } block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-md border-[1px] border-neutral-500    focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=" "
                  />
                  <label
                    htmlFor="phone"
                    className={`${
                      formik.errors.phone &&
                      formik.touched.phone &&
                      " text-red-500"
                    } absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
                  >
                    Phone
                  </label>
                </div>
                {formik.errors.phone && formik.touched.phone && (
                  <small className=" text-red-500">{formik.errors.phone}</small>
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    type="text"
                    id="email"
                    name="email"
                    className={`${
                      formik.errors.email &&
                      formik.touched.email &&
                      "border-red-500 text-red-500"
                    } block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-md border-[1px] border-neutral-500    focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className={`${
                      formik.errors.email &&
                      formik.touched.email &&
                      " text-red-500"
                    } absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
                  >
                    Email
                  </label>
                </div>
                {formik.errors.email && formik.touched.email && (
                  <small className=" text-red-500">{formik.errors.email}</small>
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    type="text"
                    id="address"
                    name="address"
                    className={`${
                      formik.errors.address &&
                      formik.touched.address &&
                      "border-red-500 text-red-500"
                    } block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-md border-[1px] border-neutral-500    focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=" "
                  />
                  <label
                    htmlFor="address"
                    className={`${
                      formik.errors.address &&
                      formik.touched.address &&
                      " text-red-500"
                    } absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
                  >
                    Address
                  </label>
                </div>
                {formik.errors.address && formik.touched.address && (
                  <small className=" text-red-500">
                    {formik.errors.address}
                  </small>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;
