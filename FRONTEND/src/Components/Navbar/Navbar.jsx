import React, { useState } from "react";
import BookIcon from "../../assets/Images/BookIcon.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
    { title: "Admin Profile", link: "/profile" },
  ];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  if (isLoggedIn === false) {
    links.splice(2, 2);
  }
  if (isLoggedIn === true && role === "user") {
    links.splice(4, 1);
  }
  if (isLoggedIn === true && role === "admin") {
    links.splice(3, 1);
  }

  const [navMobile, setNavMobile] = useState("hidden");

  return (
    <>
      <nav className="z-50 relative bg-zinc-800 text-white px-8 py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img className="h-10 me-4" src={BookIcon} alt="logo" />
          <h1 className="text-2xl font-semibold">BookHeaven</h1>
        </Link>
        <div className="nav-links-bookHeaven block md:flex items-center gap-4 cursor-pointer">
          <div className="hidden md:flex gap-4">
            {links.map((items, i) => (
              <div key={i} className="flex items-center">
                {items.title === "Profile" || items.title == "Admin Profile" ? (
                  <Link
                    to={items.link}
                    className="px-4 py-2 text-base font-semibold bg-blue-500 rounded hover:bg-white transition-all duration-300 hover:text-black"
                  >
                    {items.title}
                  </Link>
                ) : (
                  <Link
                    to={items.link}
                    key={i}
                    className="hover:text-blue-500 transition-all duration-300"
                  >
                    {items.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
          {/* Desktop SignIn and SignUp Buttons */}
          {isLoggedIn === false ? (
            <>
              {" "}
              <div className="hidden md:flex gap-4">
                <Link
                  to="/signin"
                  className="px-4 py-2 text-base font-semibold border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
                >
                  SignIn
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-base font-semibold bg-blue-500 rounded hover:bg-white transition-all duration-300 hover:text-black"
                >
                  SignUp
                </Link>
              </div>
            </>
          ) : (
            <></>
          )}
          <button
            className="text-white text-3xl block md:hidden hover:text-zinc-400 transition-all duration-300"
            onClick={() =>
              navMobile === "hidden"
                ? setNavMobile("block")
                : setNavMobile("hidden")
            }
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </nav>
      {/* Mobile Navigation */}
      <div
        className={`${
          navMobile === "block" ? "block" : "hidden"
        } bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            onClick={() => setNavMobile("hidden")}
            className="text-white text-3xl mb-4 font-semibold hover:text-blue-500 transition-all duration-300"
          >
            {items.title}
          </Link>
        ))}
        {isLoggedIn === false ? (
          <>
            {" "}
            <Link
              to="/signin"
              className="px-8 py-2 mb-8 text-3xl font-semibold flex flex-row border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              SignIn
            </Link>
            <Link
              to="/signup"
              className="px-8 py-2 mb-8 text-3xl font-semibold bg-blue-500 rounded hover:bg-white transition-all duration-300 hover:text-black"
            >
              SignUp
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Navbar;
