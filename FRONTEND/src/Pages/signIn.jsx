import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const change = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/v1/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const responce = await res.json();
    dispatch(authActions.login());
    dispatch(authActions.changeRole(responce.role));
    localStorage.setItem("id", responce.id);
    localStorage.setItem("token", responce.token);
    localStorage.setItem("role", responce.role);
    if (res.ok) {
      alert(responce.msg);
      navigate("/profile");
    }
  };

  return (
    <>
      <div className="h-auto bg-zinc-900 px-12 py-12 flex  items-center justify-center">
        <form
          onSubmit={onSubmit}
          className="bg-zinc-800 rounded-lg px-8 py-5 h-auto w-full md:w-3/6 lg:w-2/6"
        >
          <p className="text-zinc-500 text-xl">SignIn</p>
          <div>
            <label htmlFor="" className="text-zinc-400">
              Email
            </label>
            <input
              type="email"
              className="w-full p-4 hover:bg-zinc-700 transition-all duration-300 mt-2 bg-zinc-900 text-zinc-100  rounded outline-none"
              name="email"
              required
              value={values.email}
              onChange={change}
            />
          </div>
          <div>
            <label htmlFor="" className="text-zinc-400">
              Password
            </label>
            <input
              type="password"
              className="w-full p-4 rounded  hover:bg-zinc-700 transition-all duration-300  mt-2 bg-zinc-900 text-zinc-100  outline-none"
              name="password"
              required
              onChange={change}
              value={values.password}
            />
          </div>
          <button className=" text-white py-2 md:text-sm bg-blue-800 mt-8 text-4xl  px-4 w-full flex justify-center items-center hover:bg-blue-900 transition-all duration-300">
            Sign Button
          </button>

          <div className="flex flex-row justify-center gap-2 items-center mt-8">
            <p className="flex flex-row text-zinc-400 capitalize text-md">
              Dont have an account?
            </p>{" "}
            <Link to="/signup" className=" text-blue-700 font-mono">
              SignUp
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
