import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
const Settings = () => {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    Authorization: localStorage.getItem("token"),
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`http://localhost:4000/api/v1/get-user-information`, {
        headers,
      });
      setProfileData(res.data);
      setValue({ address: res.data.address });
    };
    fetch();
  }, []);
  const change = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setValue({
      ...value,
      [name]: value,
    });
  };
  const submitAddress = async () => {
    const res = await axios.put(`http://localhost:4000/api/v1/update-address`, value, {
      headers,
    });
    alert(res.data.msg);
  };
  return (
    <>
      {!profileData && <Loader />}
      {profileData && (
        <div className="h-[100%] p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <label htmlFor="">Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.username}
              </p>
            </div>
            <div className="flex-1">
              <label htmlFor="">Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="">Address</label>
            <textarea
              name="address"
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              rows="5"
              placeholder="address"
              value={value.address}
              onChange={change}
            ></textarea>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300"
              onClick={submitAddress}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
