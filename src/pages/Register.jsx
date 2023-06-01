import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState({});

  const validation = () => {
    let errorText = {};
    let isValid = true;
    if (name.length < 2) {
      isValid = false;
      errorText["name"] = "name must be at least 3 characters";
    }
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
    if (password_confirmation !== password) {
      isValid = false;
      errorText["password_confirmation"] = "password does not match";
    }
    setErrors(errorText);
    return isValid;
  };

  const formHandler = (e) => {
    e.preventDefault();
    if (validation()) {
      console.log(name, email, password);
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
        <div className="mb-8">
          <h1 className="font-bold text-2xl mb-4">Registration</h1>
          <p className="text-sm leading-tight">
            Get Started with Us: Sign Up and Experience a New Level of
            Convenience!
          </p>
        </div>
        <div>
          <form onSubmit={formHandler}>
            <div className="mb-4">
              <label htmlFor="username">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow block border rounded-full px-2 py-1 w-full  focus:outline-blue-400 "
                type="text"
                id="username"
              />
              <span className="text-red-500">
                {errors.name ? errors.name : ""}
              </span>
            </div>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow block border rounded-full px-2 py-1 w-full  focus:outline-blue-400"
                type="text"
                id="email"
              />
              <span className="text-red-500">
                {errors.email ? errors.email : ""}
              </span>
            </div>
            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow block border rounded-full px-2 py-1 w-full  focus:outline-blue-400"
                type="text"
                id="password"
              />
              <span className="text-red-500">
                {errors.password ? errors.password : ""}
              </span>
            </div>

            <div className="mb-8">
              <label htmlFor="passwordConfirmation">Confirm Password</label>
              <input
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="shadow block border rounded-full px-2 py-1 w-full  focus:outline-blue-400"
                type="text"
                id="passwordConfirmation"
              />
              <span className="text-red-500">
                {errors.password_confirmation
                  ? errors.password_confirmation
                  : ""}
              </span>
            </div>

            <div className="text-blue-400 flex justify-center text-sm gap-4 mb-3">
              <p>already have an account?</p>
              <Link to="/login">
                <span className="cursor-pointer">Login here</span>
              </Link>
            </div>
            <button
              type="submit"
              className="bg-blue-600 px-5 py-1 w-full text-white rounded-full"
            >
              sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
