import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
import { CiStar } from "react-icons/ci";
import axios from "axios";
const Favorites = () => {
  const [favorite, setFavorite] = useState();
  useEffect(() => {
    const Fetch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/get-favorite-books`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
              id: localStorage.getItem("id"),
            },
          }
        );
        const data = res.data;
        setFavorite(data.data);
      } catch (error) {
        console.error("Error fetching favorite books:", error);
      }
    };

    Fetch();
  }, [favorite]);
  return (
    <>
      {Array.isArray(favorite) && favorite.length === 0 && (
        <div className="text-5xl font-semibold text-zinc-500 h-screen flex flex-col justify-center items-center">
          No Favorite Books Added
          <CiStar className=" mx-2 text-8xl" />
        </div>
      )}

      <div className="grid grid-cols-4 gap-4  ">
        {Array.isArray(favorite) &&
          favorite.map((items, i) => {
            return (
              <div key={i}>
                <BookCard bookData={items} favorite={true} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Favorites;
