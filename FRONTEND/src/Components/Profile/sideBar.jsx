import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
const SideBar = ({ data }) => {
  const role = useSelector((state) => state.auth.role);
  const history = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className=" bg-zinc-800 p-4 rounded flex flex-col justify-between items-center h-[100%]">
      <div className="flex items-center flex-col justify-center ">
        <img src={data.avator} alt="" className="h-[12vh]" />
        <p className="mt-3 text-xl text-zinc-50 font-semibold">
          {data.username}
        </p>
        <p className="mt-1 text-normal text-zinc-300 italic">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-50 hidden lg:block"></div>
      </div>
      {role === "user" && (
        <div className="w-full flex-col items-center justify-center hidden lg:flex">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Favorites
          </Link>
          <Link
            to="/profile/orderHistory"
            className="text-zinc-100 font-semibold w-full mt-4 py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className="text-zinc-100 font-semibold w-full mt-4 py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Settings
          </Link>
        </div>
      )}
      {role === "admin" && (
        <div className="w-full flex-col items-center justify-center hidden lg:flex">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            All Orders
          </Link>
          <Link
            to="/profile/add-book"
            className="text-zinc-100 font-semibold w-full mt-4 py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Add Book
          </Link>
        </div>
      )}
      <button
        className="bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300"
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          history("/");
        }}
      >
        LogOut <CiLogin className="ms-2" />
      </button>
    </div>
  );
};

export default SideBar;
