import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import emptyCart from "../assets/Images/emptyCart.png";
import Loader from "../Components/Loader/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_BACKEND_URL;
const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);
  const headers = {
    id: localStorage.getItem("id"),
    Authorization: localStorage.getItem("token"),
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/get-user-cart`,
          { headers }
        );
        setCart(res.data.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [cart]);

  const deleteItems = async (bookid) => {
    const res = await axios.put(
      `http://localhost:4000/api/v1/remove-from-cart/${bookid}`,
      {},
      { headers }
    );
    alert(res.data.msg);
  };
  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = 0;
      cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
      total = 0;
    }
  }, [cart]);
  const placeOrder = async () => {
    try {
      const res = await axios.post(
        `http://localhost:4000/api/v1/place-order`,
        { order: cart },
        {
          headers,
        }
      );
      alert(res.data.msg);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {!cart && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}

      {cart.length === 0 && (
        <div className="h-screen bg-zinc-900">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className=" capitalize text-5xl lg:text-6xl font-semibold text-zinc-400">
              Empty Cart
            </h1>
            <img src={emptyCart} alt="emptyCart" className="lg:h-[50vh]" />
          </div>
        </div>
      )}

      {cart && cart.length > 0 && (
        <div className="bg-zinc-900">
          <h1 className=" text-5xl font-semibold  text-zinc-500 mb-8 capitalize">
            Your Cart
          </h1>
          {cart.map((items, i) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
              key={i}
            >
              <img
                src={items.url}
                alt=""
                className="h-[20vh] md:h-[10vh] object-cover"
              />
              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-zinc-100 font-semibold text-center mt-2 md:mt-0">
                  {items.title}
                </h1>
                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                  {items.desc.slice(0, 100)}
                </p>
                <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                  {items.desc.slice(0, 65)}
                </p>
                <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                  {items.desc.slice(0, 100)}
                </p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h2 className="text-zinc-100 text-3xl font-semibold flex">
                  $ {items.price}
                </h2>
                <button
                  className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                  onClick={() => deleteItems(items._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart && cart.length > 0 && (
        <div className="mt-4 w-full flex items-center justify-end">
          <div className="p-4 bg-zinc-800 rounded">
            <h1 className="text-3xl text-zinc-200 font-semibold capitalize">
              total amount
            </h1>
            <div className="mt-3 flex items-center justify-between tex-xl text-zinc-200">
              <h2>
                {cart.length} books &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{" "}
                <span className="font-semibold text-xl text-blue-600">
                  ${Total}
                </span>
              </h2>
            </div>
            <div className="w-[100%] mt-3">
              <button
                onClick={placeOrder}
                className=" bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-white capitalize"
              >
                place your order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
