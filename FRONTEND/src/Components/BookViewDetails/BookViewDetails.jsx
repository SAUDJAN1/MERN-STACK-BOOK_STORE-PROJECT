import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import { GrLanguage } from "react-icons/gr";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const BookViewDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const [data, setData] = useState(null); // Start with null instead of []
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const Fetch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/get-book-by-id/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setData(res.data.data); // Set the fetched data
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false); // Stop loading after the data is fetched
      }
    };
    Fetch();
  }, []);
  const handleFavorite = async () => {
    const res = await fetch(
      `http://localhost:4000/api/v1/add-book-to-favorite`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          id: localStorage.getItem("id"),
          bookid: id,
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(),
      }
    );
    const data = await res.json();
    alert(data.msg);
  };
  const handleCart = async () => {
    const res = await fetch(`http://localhost:4000/api/v1/add-to-cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        id: localStorage.getItem("id"),
        bookid: id,
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    alert(data.msg);
  };
  const headers = {
    id: localStorage.getItem("id"),
    Authorization: localStorage.getItem("token"),
    bookid: id,
  };
  const deleteBook = async () => {
    const res = await axios.delete(`http://localhost:4000/api/v1/delete-book`, {
      headers,
    });
    alert(res.data.msg);
    navigate("/all-books");
  };
  return (
    <>
      {loading ? (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex items-center gap-8 flex-col md:flex-row ">
          <div className="rounded-2xl bg-zinc-800    px-4 py-12 h-[60vh] lg:h-[88vh] w-full lg:w-3/6 flex    justify-around gap-8">
            <img
              src={data.url}
              alt=""
              className="h-[50vh] lg:h-[75vh] rounded-2xl"
            />
            {isLoggedIn === true && role === "user" && (
              <>
                <div className="flex items-start -mx-4   flex-col gap-4">
                  <button
                    className="bg-white rounded-full text-3xl p-3 text-red-500"
                    onClick={handleFavorite}
                  >
                    <FaHeart />
                  </button>
                  <button
                    className="bg-white rounded-full text-3xl p-3  text-blue-500"
                    onClick={handleCart}
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              </>
            )}
            {isLoggedIn === true && role === "admin" && (
              <>
                <div className="flex items-start -mx-4   flex-col gap-4">
                  <Link
                    to={`/update-book/${id}`}
                    className="bg-white rounded-full text-3xl p-3 text-red-500"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    className="bg-white rounded-full text-3xl p-3  text-blue-500"
                    onClick={deleteBook}
                  >
                    <MdDelete />
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {data.title}
            </h1>
            <p className="text-zinc-400 mt-1">by {data?.author}</p>
            <p className="text-zinc-500 mt-4 text-xl text-justify">
              {data.desc}
            </p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <GrLanguage className="me-3" /> {data?.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price: ${data.price}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default BookViewDetails;
