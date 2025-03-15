import { Link } from "react-router-dom";
import axios from "axios";
const BookCard = ({ bookData, favorite }) => {
  const handleRemoveButton = async () => {
    const res = await axios.put(
      `http://localhost:4000/api/v1/delete-book-from-favorite`,
      {},
      {
        headers: {
          id: localStorage.getItem("id"),
          Authorization: localStorage.getItem("token"),
          bookid: bookData._id,
        },
      }
    );
    alert(res.data.msg);
  };
  return (
    <>
      <div className="bg-zinc-800 rounded flex-col   flex items-center justify-center">
        <Link to={`/view-book-details/${bookData._id}`}>
          <div className="bg-zinc-800 rounded p-4 flex flex-col">
            <div className="bg-zinc-900 rounded  flex items-center justify-center">
              <img src={bookData.url} alt="/" className="h-[35vh] p-4 md:p-4" />
            </div>
            <h2 className="mt-4 text-xl text-white font-semibold">
              {bookData.title}
            </h2>
            <p className=" mt-2 text-zinc-400 font-semibold italic">
              by {bookData.author}
            </p>
            <p className="mt-2 text-zinc-200 font-semibold text-xl">
              ${bookData.price}
            </p>
          </div>
        </Link>
        {favorite && (
          <button
            className="bg-yellow-100 px-4 py-2 rounded border border-yellow-500 text-yellow-800 mb-2"
            onClick={handleRemoveButton}
          >
            Remove From Favorite
          </button>
        )}
      </div>
    </>
  );
};
export default BookCard;
