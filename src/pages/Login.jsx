import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/contactApi";

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
    <div className="flex items-center justify-between px-10 py-5 my-5 md:my-0">
      <div className="hidden md:block w-[50%] h-auto">
        <img
          src="https://img.freepik.com/premium-vector/smiling-man-holding-smart-phone-wearing-casual-clothes-standing-showing-thumbs-up-positive-gesture-ok-sign-gesture-language-concept-illustration_270158-266.jpg?w=740"
          className="object-cover"
        />
      </div>

      <div className="shadow md:shadow-none px-5 py-4 w-[350px] lg:w-[30%] mx-auto">
        <div className="mb-6">
          <h1 className="font-bold text-2xl mb-4">Sign In</h1>
          <p className="text-sm leading-tight text-gray-500">
            Login and stay connected with our community!
          </p>
        </div>
        <div>
          <form onSubmit={loginHandler}>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow block border rounded-md px-2 py-1 w-full  focus:outline-blue-400"
                type="text"
                id="email"
              />
              <span className="text-red-500">
                {errors.email ? errors.email : ""}
              </span>
            </div>
            <div className="mb-6">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow block border rounded-md px-2 py-1 w-full  focus:outline-blue-400"
                type="text"
                id="password"
              />
              <span className="text-red-500">
                {errors.password ? errors.password : ""}
              </span>
            </div>

            <button
              type="submit"
              className="bg-blue-600 px-5 py-1 w-full text-white rounded-md"
            >
              Sign in
            </button>
            <div className="text-blue-400 flex justify-center text-sm gap-4 mt-3">
              <p>Do not have an account?</p>
              <Link to="/register">
                <span className="cursor-pointer">Register here</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
