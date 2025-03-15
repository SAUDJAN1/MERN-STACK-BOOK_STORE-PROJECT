import React from "react";
import Hero1 from "../../assets/Images/Hero1.png";
import {Link} from 'react-router-dom'
const Hero = () => {
  return (
    <>
      <div className="h-screen items-center justify-center md:h-[75vh] flex flex-col gap-12   md:flex-row mt-12 ">
        <div className="w-full lg:w-3/6 flex-col md:items-start md:justify-start">
          <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 text-center capitalize lg:text-left">
            discover your next <br /> great read
          </h1>
          <p className="mt-4 text-xl text-zinc-300 text-center lg:text-left">
            uncover captive stories,enriching knowledge,and endless inspiration
            in our curated collection of books
          </p>
          <div className="mt-8 justify-center flex md:justify-start  md: mb-4 ">
            <Link to='/all-books' className="text-yellow-100  text-2xl font-semibold border border-yellow-100 rounded-full  px-10 py-3 hover:bg-zinc-800 capitalize">
              discover books
            </Link>
          </div>
        </div>
        <div className=" -mt-20 w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center ">
          <img src={Hero1} alt="HeroLogo" />
        </div>
      </div>
    </>
  );
};

export default Hero;
