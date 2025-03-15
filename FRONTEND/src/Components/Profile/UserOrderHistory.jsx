import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import NoOrderHistory from "../../assets/Images/NoOrderHistory.png";
const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    Authorization: localStorage.getItem("token"),
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `http://localhost:4000/api/v1/get-order-history`,
        {
          headers,
        }
      );
      setOrderHistory(res.data.data);
    };
    fetch();
  }, []);
  return (
    <>
      {!orderHistory && (
        <div className="flex  items-center justify-center h-[100%]">
          <Loader />
        </div>
      )}
      {orderHistory && orderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8 capitalize">
              no order history
            </h1>
            <img src={NoOrderHistory} alt="NoOrderHistoryLogo" />
          </div>
        </div>
      )}
      {orderHistory && orderHistory.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8 capitalize">
            your order history
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded  py-2 px-4 flex  gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[22%]">
              <h1 className="text-center">Books</h1>
            </div>
            <div className="w-[45%]">
              <h1 className="">Description</h1>
            </div>
            <div className="w-[16%]">
              <h1 className="">Price</h1>
            </div>
            <div className="w-[16%]">
              <h1 className="">Status</h1>
            </div>
            <div className="max-none md:w-[5%] hidden md:block">
              <h1 className="">Mode</h1>
            </div>
          </div>
        </div>
      )}
      {orderHistory &&
        orderHistory.map((items, i) => (
          <div
            className="bg-zinc-800 w-full flex flex-row rounded py-2 px-4 glex gap-4 hover:bg-zinc-900 hover:cursor-pointer"
            key={items._id}
          >
            <div className="w-[3%]">
              <h1 className="text-center">{i + 1}</h1>
            </div>
            <div className="w-[22%]">
              {items.book ? (
                <Link
                  to={`/view-book-details/${items.book._id}`}
                  className="hover:text-blue-300"
                >
                  {items.book.title}
                </Link>
              ) : (
                <span className="text-gray-500">
                  Book information unavailable
                </span>
              )}
            </div>
            <div className="w-[45%]">
              {items.book ? (
                <h1>{items.book.desc.slice(0, 50)} ...</h1>
              ) : (
                <h1 className="text-gray-500">Description unavailable</h1>
              )}
            </div>
            <div className="w-[9%]">
              {items.book ? (
                <h1>{items.book.price}</h1>
              ) : (
                <h1 className="text-gray-500">Price unavailable</h1>
              )}
            </div>
            <div className="w-[16%]">
              <h1 className="font-semi-bold text-green-500">
                {items.status === "Order Placed" ? (
                  <div className="text-yellow-500">{items.status}</div>
                ) : items.status === "Cancelled" ? (
                  <div className="text-red-500">{items.status}</div>
                ) : (
                  items.status
                )}
              </h1>
            </div>
          </div>
        ))}
    </>
  );
};

export default UserOrderHistory;
