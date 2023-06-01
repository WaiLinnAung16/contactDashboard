import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/AuthApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [login] = useLoginMutation();

  const nav = useNavigate();

  const validation = () => {
    let errorText = {};
    let isValid = true;

    if (email.length === 0) {
      isValid = false;
      errorText["email"] = "email required";
    } else if (!email.match(/^\S+@\S+$/)) {
      isValid = false;
      errorText["email"] = "invalid email";
    }

    if (password.length < 8) {
      isValid = false;
      errorText["password"] = "password must have at least 8 characters";
    }

    setErrors(errorText);
    return isValid;
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    if (validation()) {
      const user = { email, password };
      const { data } = await login(user);
      // console.log(data)
      if (data?.success) {
        nav("/");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-between  px-10 py-5 my-5 md:my-0">
        <div className="hidden md:block w-[50%] h-auto">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-business-planning_52683-76248.jpg?w=740&t=st=1685611921~exp=1685612521~hmac=5d7c1e6c5a4bd9c040e73c1fc4261fe473e464b72ac73711ebadab68ca526cee"
            className="object-cover"
          />
        </div>

        <div className="shadow md:shadow-none px-5 py-4 w-[350px] lg:w-[30%] mx-auto ">
          <div className="mb-8">
            <h1 className="font-bold text-2xl mb-4">Sign In</h1>
            <p className="text-sm leading-tight text-gray-500">
              Login and stay connected with our community!
            </p>
          </div>
          <div>
            <form onSubmit={loginHandler} className="flex flex-col gap-5">
              <div>
                <div className="relative">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    id="email"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-gray-600 dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute px-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Email
                  </label>
                </div>
                <span className="text-red-500">
                  {errors.email ? errors.email : ""}
                </span>
              </div>
              <div>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="text"
                    id="password"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-gray-600 dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="password"
                    className="absolute px-2 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    password
                  </label>
                </div>
                <span className="text-red-500">
                  {errors.password ? errors.password : ""}
                </span>
              </div>

              <div className="text-blue-400 flex justify-center text-sm gap-4 mb-3">
                <p>Do not have an account?</p>
                <Link to="/register">
                  <span className="cursor-pointer">Register here</span>
                </Link>
              </div>
              <button
                type="submit"
                className="bg-blue-600 px-5 py-1 w-full text-white rounded-md"
              >
                sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
