import userModel from "../Models/user.js";
const addToCart = async (req, res) => {
  try {
    const { id, bookid } = req.headers;
    const userData = await userModel.findById(id);
    const isBookInCart = userData.cart.includes(bookid);
    if (isBookInCart) {
      return res.status(200).json({ msg: "Book is Already in Cart" });
    }
    await userModel.findByIdAndUpdate(id, { $push: { cart: bookid } });
    return res.status(200).json({ msg: "Book added to Cart" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "An Error Occured" });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;
    const userData = await userModel.findByIdAndUpdate(id, {
      $pull: { cart: bookid },
    });
    if (userData) {
      return res.status(200).json({ msg: "Book Remove From Cart" });
    }
  } catch (error) {
    res.status(500).json({ msg: "An Error Occured", error: error.message });
  }
};
const getUserCart = async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await userModel.findById(id).populate("cart");
    const cart = userData.cart.reverse();
    return res.status(200).json({ status: true, data: cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "An Error Occured", error: error.message });
  }
};
export { addToCart, removeFromCart, getUserCart };
