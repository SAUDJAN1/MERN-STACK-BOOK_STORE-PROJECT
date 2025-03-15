import bookModel from "../Models/book.js";
//add-book admin-role
const addBook = async (req, res) => {
  try {
    const { url, title, author, price, desc, language } = req.body;
    const addBook = await bookModel.create({
      url,
      title,
      author,
      price,
      desc,
      language,
    });
    res.status(200).json({ success: true, msg: "Book Added Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};
//update book
const updateBook = async (req, res) => {
  try {
    // Extract bookid from headers
    const { bookid } = req.headers;
    if (!bookid) {
      return res
        .status(400)
        .json({ success: false, msg: "Book ID is required" });
    }

    // Extract fields from body
    const { url, title, author, price, desc, language } = req.body;

    // Validate required fields
    if (!url || !title || !author || !price || !desc || !language) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are required" });
    }

    // Update the book
    const bookUpdate = await bookModel.findByIdAndUpdate(bookid, {
      url,
      title,
      author,
      price,
      desc,
      language,
    });

    // Check if bookUpdate is successful
    if (!bookUpdate) {
      return res.status(404).json({ success: false, msg: "Book not found" });
    }

    res.status(200).json({
      success: true,
      msg: "Book Updated Successfully",
      book: bookUpdate,
    });
  } catch (error) {
    console.error("Update Book Error:", error);
    res
      .status(500)
      .json({
        success: false,
        msg: "Internal server error",
        error: error.message,
      });
  }
};
const deleteBook = async (req, res) => {
  try {
    const { bookid } = req.headers;
    await bookModel.findByIdAndDelete(bookid);
    return res
      .status(200)
      .json({ success: true, msg: "Book Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: " An Error Occured",error:error.message });
  }
};
const getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: books });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "An Error Occured", error:error.message });
  }
};
const getRecentBooks = async (req, res) => {
  try {
    const books = await bookModel.find().sort({ createdAt: -1 }).limit(4);
    return res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: true, msg: "An Error Occured" , error:error.message});
  }
};
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookModel.findById(id);
    return res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, msg: "An Error Occured", error:error.message });
  }
};

export {
  addBook,
  updateBook,
  deleteBook,
  getAllBooks,
  getRecentBooks,
  getBookById,
};
