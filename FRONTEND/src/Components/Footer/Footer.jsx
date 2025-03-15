import React from "react";
import { ImFacebook2, ImMail, ImTwitter, ImLinkedin } from "react-icons/im";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <div className="bg-zinc-800 text-white px-8 py-4 ">
        <h1 className=" text-xl font-semibold flex justify-center gap-8 cursor-pointer ">
          <ImFacebook2 className="hover:text-blue-500 transition-all duration-300" />
          <AiFillInstagram className="hover:text-blue-500 transition-all duration-300" />
          <ImLinkedin className="hover:text-blue-500 transition-all duration-300" />
          <ImTwitter className="hover:text-blue-500 transition-all duration-300" />
          <ImMail className="hover:text-blue-500 transition-all duration-300" />
        </h1>
      </div>
    </>
  );
};

export default Footer;
