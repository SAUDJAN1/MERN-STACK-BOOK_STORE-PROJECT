import express from "express";
const Routing = express.Router();
import {
  signUp,
  signIn,
  getUserInformation,
  updateAddress,
} from "../Controllers/authController.js";
import {
  addBook,
  updateBook,
  deleteBook,
  getAllBooks,
  getRecentBooks,
  getBookById,
} from "../Controllers/book.js";
import { RequiredSignIn, isAdmin } from "../Middleware/authMiddlewares.js";
import {
  addToFavorite,
  getFavoriteBooks,
  RemoveFromFavorite,
} from "../Controllers/favorite.js";
import { addToCart, removeFromCart, getUserCart } from "../Controllers/cart.js";
import {
  orderPlace,
  getOrderHistory,
  getAllOrders,
  updateStatus,
} from "../Controllers/order.js";
//check api passed
Routing.post("/signup", signUp); //check
Routing.post("/signin", signIn); //check
Routing.get("/get-user-information", RequiredSignIn, getUserInformation); //check
Routing.put("/update-address", RequiredSignIn, updateAddress); //check
Routing.post("/add-book", RequiredSignIn, isAdmin, addBook); //check
Routing.put("/update-book", RequiredSignIn, updateBook); //check
Routing.delete("/delete-book", RequiredSignIn, deleteBook); //check
Routing.get("/get-all-books", RequiredSignIn, getAllBooks); //check
Routing.get("/get-recent-books", getRecentBooks); //check
Routing.get("/get-book-by-id/:id", RequiredSignIn, getBookById); //check
Routing.put("/add-book-to-favorite", RequiredSignIn, addToFavorite); //check
Routing.put("/delete-book-from-favorite", RequiredSignIn, RemoveFromFavorite); //check
Routing.get("/get-favorite-books", RequiredSignIn, getFavoriteBooks); //check
Routing.put("/add-to-cart", RequiredSignIn, addToCart); //check
Routing.put("/remove-from-cart/:bookid", RequiredSignIn, removeFromCart); //check
Routing.get("/get-user-cart", RequiredSignIn, getUserCart); //check
Routing.post("/place-order", RequiredSignIn, orderPlace);
Routing.get("/get-order-history", RequiredSignIn, getOrderHistory);
Routing.get("/get-all-orders", RequiredSignIn, getAllOrders);
Routing.get("/update-status/:id", RequiredSignIn, updateStatus);
export default Routing;
