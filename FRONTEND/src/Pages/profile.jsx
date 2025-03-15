import React, { useEffect, useState } from "react";
import SideBar from "../Components/Profile/sideBar";
import { Outlet } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import axios from "axios";
const profile = () => {
  const [profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    Authorization: localStorage.getItem("token"),
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`http://localhost:4000/api/v1/get-user-information`, {
        headers,
      });

      setProfile(res.data);
    };
    fetch();
  }, []);

  return (
    <>
      <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-auto py-8 gap-4 text-white">
        {!profile && (
          <div className="h-screen w-screen flex justify-center items-center">
            <Loader />{" "}
          </div>
        )}
        {profile && (
          <>
            <div className="w-full md:w-1/6">
              <SideBar data={profile} favorite={true} />
            </div>
            <div className="w-full md:h-5/6">
              <Outlet />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default profile;
