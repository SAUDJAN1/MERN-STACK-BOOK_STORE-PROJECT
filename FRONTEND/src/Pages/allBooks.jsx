import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../Components/BookCard/BookCard.jsx";
const AllBooks = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const Fetch = async () => {
      const res = await axios.get(
        `http://localhost:4000/api/v1/get-all-books`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      setData(res.data.data);
    };
    Fetch();
  }, []);
  return (
    <>
      <div className="bg-zinc-900 h-auto px-12 py-8  ">
        <h4 className="text-4xl text-yellow-100 capitalize">All books</h4>

        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {data &&
            data.map((items, i) => {
              return (
                <div key={i}>
                  {" "}
                  <BookCard bookData={items} />{" "}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default AllBooks;
