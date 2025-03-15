import React, { useEffect } from "react";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/home";
import SignUp from "./Pages/signUp";
import SignIn from "./Pages/signIn";
import AllBooks from "./Pages/allBooks.jsx";
import Profile from "./Pages/profile";
import Cart from "./Pages/cart";
import { Routes, Route } from "react-router-dom";
import BookViewDetails from "./Components/BookViewDetails/BookViewDetails.jsx";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth.js";
import Favorites from "./Components/Profile/Favorites.jsx";
import UserOrderHistory from "./Components/Profile/UserOrderHistory.jsx";
import Settings from "./Components/Profile/settings.jsx";
import AllOrders from "./Pages/allOrders.jsx";
import AddBook from "./Pages/AddBook.jsx";
import UpdateBook from "./Pages/updateBook.jsx";
const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/profile" element={<Profile />}>
          {role === "user" ? (
            <Route index element={<Favorites />} />
          ) : (
            <Route index element={<AllOrders />} />
          )}
          {role === "admin" && <Route path="add-book" element={<AddBook />} />}
          <Route path="orderHistory" element={<UserOrderHistory />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/update-book/:id" element={<UpdateBook />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/view-book-details/:id" element={<BookViewDetails />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
