import React, { useEffect, useState } from "react";
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
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import {
  useGetSingleContactQuery,
  useUpdateContactMutation,
} from "../redux/api/contactApi";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import * as Yup from "yup";
import { BsArrowLeft } from "react-icons/bs";

const userSchema = Yup.object().shape({
  name: Yup.string().min(3).max(50),
  phone: Yup.string(),
  email: Yup.string().email(),
  address: Yup.string(),
});

const Update = () => {
  const { id } = useParams();
  const [toggleModal, setToggleModal] = useState(false);
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState("");
  const { token } = useSelector((store) => store.authSlice);

  const [updateContact, { isLoading: isUpdateLoading }] =
    useUpdateContactMutation();
  const { data: contact, isLoading } = useGetSingleContactQuery({ id, token });
  const [data, setData] = useState({});
  // console.log(contact?.contact);

  useEffect(() => {
    setData(contact?.contact);
  }, [contact]);

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
      const { data } = await updateContact({ id, userData: values, token });
      console.log(data);
      if (data?.success) {
        setTimeout(() => {
          actions.resetForm();
          navigate(`/detail/${id}`);
        }, 1000);
      }
    },
  });

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
              className="md:self-end md:m-0 self-center mt-5 btn"
              disabled={isUpdateLoading ? true : false}
            >
              Save
            </button>
          </div>
        </div>

        <form id="create-form" onSubmit={formik.handleSubmit}>
          <div className=" m-10 space-y-8 mt-[430px] md:mt-[280px]">
            <div className=" flex items-start gap-8">
              <AiOutlineUser className=" mt-4 text-xl text-gray-700" />
              <div className="w-[300px] md:w-[500px]">
                <div className="relative">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    defaultValue={data?.name}
                    type="text"
                    id="name"
                    name="name"
                    className={`${
                      formik.errors.name &&
                      formik.touched.name &&
                      "border-red-500 text-red-500"
                    } block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-neutral-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=" "
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
                    defaultValue={data?.phone}
                    type="text"
                    id="phone"
                    name="phone"
                    className={`${
                      formik.errors.phone &&
                      formik.touched.phone &&
                      "border-red-500 text-red-500"
                    } block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-neutral-600    focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
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
                    defaultValue={data?.email}
                    type="text"
                    id="email"
                    name="email"
                    className={`${
                      formik.errors.email &&
                      formik.touched.email &&
                      "border-red-500 text-red-500"
                    } block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-neutral-600    focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
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
                    defaultValue={data?.address}
                    type="text"
                    id="address"
                    name="address"
                    className={`${
                      formik.errors.address &&
                      formik.touched.address &&
                      "border-red-500 text-red-500"
                    } block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-neutral-600    focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
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

export default Update;
