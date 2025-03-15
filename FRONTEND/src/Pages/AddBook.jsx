import axios from "axios";
import React, { useState } from "react";
const AddBook = () => {
  const headers = {
    id: localStorage.getItem("id"),
    Authorization: localStorage.getItem("token"),
  };

  const [bookData, setBookData] = useState({
    url: "",
    title: "",
    author: "",
    language: "",
    price: "",
    desc: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        bookData.url === "" ||
        bookData.author === "" ||
        bookData.price === "" ||
        bookData.title === "" ||
        bookData.desc === "" ||
        bookData.language === ""
      ) {
        alert("All Fields are Required");
      } else {
        const res = await axios.post(
          `http://localhost:4000/api/v1/add-book`,
          bookData, // Pass the bookData object directly here
          { headers }
        );
        alert(res.data.msg);
        setBookData({
          url: "",
          desc: "",
          price: "",
          author: "",
          language: "",
          title: "",
        });
      }
    } catch (error) {
      console.error("Error occurred:", error); // Debugging: Log the full error
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-zinc-700">
        Add New Book
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label htmlFor="url" className="block text-zinc-400 mb-2">
            Image URL
          </label>
          <input
            type="text"
            id="url"
            name="url"
            value={bookData.url}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-zinc-700 text-zinc-100 border-zinc-600"
            placeholder="Enter image URL"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="title" className="block text-zinc-400 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-zinc-700 text-zinc-100 border-zinc-600"
            placeholder="Enter book title"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="author" className="block text-zinc-400 mb-2">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-zinc-700 text-zinc-100 border-zinc-600"
            placeholder="Enter author name"
          />
        </div>

        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="language" className="block text-zinc-400 mb-2">
              Language
            </label>
            <input
              type="text"
              id="language"
              name="language"
              value={bookData.language}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-zinc-700 text-zinc-100 border-zinc-600"
              placeholder="Enter book language"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-zinc-400 mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={bookData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-zinc-700 text-zinc-100 border-zinc-600"
              placeholder="Enter book price"
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="desc" className="block text-zinc-400 mb-2">
            Description
          </label>
          <textarea
            id="desc"
            name="desc"
            value={bookData.desc}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-zinc-700 text-zinc-100 border-zinc-600"
            rows="4"
            placeholder="Enter book description"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-400 text-zinc-900 font-semibold px-6 py-2 rounded-lg transition-all duration-300"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
