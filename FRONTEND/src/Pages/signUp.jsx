import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_BACKEND_URL;
const SignUp = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
    } catch (error) {}
    const res = await fetch(`http://localhost:4000/api/v1/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(values),
    });
    const responce = await res.json();
    console.log(responce);
    if (res.ok) {
      navigate("/signin");
      alert(responce.msg);
    }
  };

  return (
    <div className="h-auto bg-zinc-900 px-8 py-12 flex  items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 h-screen w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">SignUp</p>
        <form onSubmit={onSubmit} className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-400">
              UserName
            </label>
            <input
              className="w-full p-2 rounded  hover:bg-zinc-700 transition-all duration-300 mt-2 bg-zinc-900 text-zinc-100 outline-none"
              name="username"
              required
              value={values.username}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <div>
              <label htmlFor="" className="text-zinc-400">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded  hover:bg-zinc-700 transition-all duration-300 mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                name="email"
                required
                value={values.email}
                onChange={change}
              />
            </div>
          </div>
          <div className="mt-4">
            <div>
              <label htmlFor="" className="text-zinc-400">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded  hover:bg-zinc-700 transition-all duration-300  mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                name="password"
                required
                value={values.password}
                onChange={change}
              />
            </div>
          </div>
          <div className="mt-4">
            <div>
              <label htmlFor="" className="text-zinc-400">
                Address
              </label>
              <input
                className="w-full rounded  hover:bg-zinc-700 transition-all duration-300 mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                required
                name="address"
                value={values.address}
                onChange={change}
              />
            </div>
            <button className=" text-white py-2 md:text-2xl bg-blue-800 mt-2  px-4 w-full flex justify-center items-center hover:bg-blue-900 transition-all duration-300">
              SignUp Button
            </button>
            <p className=" text-white text-sm mt-2 md:text-2xl flex justify-center items-center">
              Or
            </p>
            <div className="flex flex-row justify-center gap-2 items-center">
              <p className="flex flex-row text-zinc-400 capitalize text-md">
                already have an account?
              </p>{" "}
              <Link to="/signin" className=" text-blue-700 font-mono">
                SignIn
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
