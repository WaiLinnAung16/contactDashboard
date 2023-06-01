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
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import { useFormik } from "formik";
import { userSchema } from "../validationschema";
import { Toaster, toast } from "react-hot-toast";
import {
  useGetSingleContactQuery,
  useUpdateContactMutation,
} from "../redux/api/contactApi";
import ToastAlert from "../components/ToastAlert";

const Update = () => {
  const { id } = parseInt(useParams());
  const [toggleModal, setToggleModal] = useState(false);
  const navigate = useNavigate();

  const [updateContact] = useUpdateContactMutation();
  const { data: contact } = useGetSingleContactQuery({ id });

  // formik
  const formik = useFormik({
    initialValues: {
      name: contact?.name,
      phone: contact?.phone,
      email: contact?.email,
      address: contact?.address,
    },

    validationSchema: userSchema,

    onSubmit: async (values, actions) => {
      const data = await updateContact({ id, userData: values });
      toast.custom(<ToastAlert title={"update success"} />);
      setTimeout(() => {
        actions.resetForm();
      }, 1000);
    },
  });

  // console.log(formik.errors);
  // console.log(formik.touched);
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      {toggleModal && (
        <Modal toggleModal={toggleModal} setToggleModal={setToggleModal} />
      )}
      <div className="w-[75%] mx-auto p-5">
        <div className=" m-10 flex justify-between">
          <div className=" flex items-center gap-10">
            <button
              className=" self-start text-xl"
              onClick={() => navigate(-1)}
            >
              <RxCross2 />
            </button>
            <div
              onClick={() => setToggleModal(!toggleModal)}
              className=" p-16 bg-sky-200 rounded-full w-fit"
            >
              <MdOutlineAddPhotoAlternate className=" text-3xl" />
            </div>
            <div className=" flex flex-col items-center gap-3">
              <h1 className=" text-2xl ">myo nyi</h1>
              <button className="hover:bg-gray-200 flex gap-3 items-center border border-gray-400 px-2 py-1 text-sm rounded-lg">
                <span className=" text-lg text-blue-700 ">
                  <AiOutlinePlus />
                </span>
                Label
              </button>
            </div>
          </div>
          <button
            form="create-form"
            type="submit"
            className=" self-end btn"
            disabled={
              formik.values.name ||
              formik.values.phone ||
              formik.values.email ||
              formik.values.address
                ? false
                : true
            }
          >
            Save
          </button>
        </div>
        <hr />
        <form id="create-form" onSubmit={formik.handleSubmit}>
          <div className=" m-10 space-y-8">
            <div className=" flex items-center gap-8">
              <div className=" flex flex-col items-center">
                <AiOutlineUser className=" create-name text-xl text-gray-400 group" />
              </div>
              <div className=" flex flex-col gap-2">
                <div className="relative w-[500px]">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    defaultValue={formik.values.name}
                    type="text"
                    id="name"
                    name="name"
                    className={`${
                      formik.errors.name &&
                      formik.touched.name &&
                      "border-red-500 text-red-500"
                    } block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=" "
                  />
                  <label
                    htmlFor="name"
                    className={`${
                      formik.errors.name &&
                      formik.touched.name &&
                      " text-red-500"
                    } absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
                  >
                    Name
                  </label>
                </div>
                {formik.errors.name && formik.touched.name && (
                  <small className=" text-red-500">{formik.errors.name}</small>
                )}
              </div>
            </div>
            <div className=" flex items-center gap-8">
              <div className=" flex flex-col items-center">
                <AiOutlinePhone className=" text-xl text-gray-400" />
              </div>
              <div className=" flex flex-col gap-2">
                <div className="relative w-[500px]">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    defaultValue={formik.values.phone}
                    type="number"
                    id="phone"
                    name="phone"
                    className={`${
                      formik.errors.phone &&
                      formik.touched.phone &&
                      "border-red-500 text-red-500"
                    } block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=" "
                  />
                  <label
                    htmlFor="phone"
                    className={`${
                      formik.errors.phone &&
                      formik.touched.phone &&
                      " text-red-500"
                    } absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
                  >
                    Phone
                  </label>
                </div>
                {formik.errors.phone && formik.touched.phone && (
                  <small className=" text-red-500">{formik.errors.phone}</small>
                )}
              </div>
            </div>
            <div className=" flex items-center gap-8">
              <div className=" flex flex-col items-center">
                <AiOutlineMail className=" text-xl text-gray-500" />
              </div>
              <div className=" flex flex-col gap-2">
                <div className="relative w-[500px]">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    defaultValue={formik.values.email}
                    type="text"
                    id="email"
                    name="email"
                    className={`${
                      formik.errors.email &&
                      formik.touched.email &&
                      "border-red-500 text-red-500"
                    } block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className={`${
                      formik.errors.email &&
                      formik.touched.email &&
                      " text-red-500"
                    } absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
                  >
                    Email
                  </label>
                </div>
                {formik.errors.email && formik.touched.email && (
                  <small className=" text-red-500">{formik.errors.email}</small>
                )}
              </div>
            </div>
            <div className=" flex items-center gap-8">
              <div className=" flex flex-col items-center">
                <FaRegAddressCard className=" text-xl text-gray-500" />
              </div>
              <div>
                <div className="relative w-[500px]">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    defaultValue={formik.values.address}
                    type="text"
                    id="address"
                    name="address"
                    className={`${
                      formik.errors.address &&
                      formik.touched.address &&
                      "border-red-500 text-red-500"
                    } block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=" "
                  />
                  <label
                    htmlFor="address"
                    className={`${
                      formik.errors.address &&
                      formik.touched.address &&
                      " text-red-500"
                    } absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
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

export default Update;
