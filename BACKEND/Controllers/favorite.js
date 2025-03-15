import userModel from "../Models/user.js";
const addToFavorite = async (req, res) => {
  try {
    const { id, bookid } = req.headers;
    const userData = await userModel.findById(id);
    const isBookFavorite = userData.favourites.includes(bookid);
    if (isBookFavorite) {
      return res.status(200).json({ msg: "Book is Already in Favorite" });
    }
    await userModel.findByIdAndUpdate(id, { $push: { favourites: bookid } });
    return res.status(200).json({ msg: "Book added to Favorite" });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
const RemoveFromFavorite = async (req, res) => {
  try {
    const { id, bookid } = req.headers;
    const userData = await userModel.findById(id);
    const isBookFavorite = userData.favourites.includes(bookid);
    if (isBookFavorite) {
      await userModel.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
    }
    return res.status(200).json({ msg: "Book Removed from  Favorite" });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};
const getFavoriteBooks = async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await userModel.findById(id).populate("favourites");
    const favoriteBooks = userData.favourites;
    return res.status(200).json({ success: true, data: favoriteBooks });
  } catch (error) {
    res.status(500).json({ msg: "An Error Occured" });
  }
};
export { addToFavorite, RemoveFromFavorite, getFavoriteBooks };
