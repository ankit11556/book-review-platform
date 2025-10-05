import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBooksApi } from "../services/BookApi";

const Home = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch all books with pagination
  const fetchBooks = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const res = await getAllBooksApi(pageNumber);
      console.log(res.data.books);
      
      setBooks(res.data.books);
      setTotalPages(res.data.totalPages);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(page);
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">All Books</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="w-full sm:w-[45%] md:w-[30%] lg:w-[18%] bg-white p-5 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <h2 className="text-2xl font-semibold text-gray-800">{book.title}</h2>
              <p className="text-gray-600 mt-2"><span className="font-medium">Author:</span> {book.author}</p>
              <p className="text-gray-600 mt-1"><span className="font-medium">Genre:</span> {book.genre}</p>
              <p className="text-gray-600 mt-1"><span className="font-medium">Year:</span> {book.year}</p>
              <p className="text-yellow-500 mt-2">⭐ {book.averageRating || 0}</p>

              <button
                onClick={() => navigate(`/books/${book._id}`)}
                className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold rounded hover:scale-105 transform transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-3">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2 bg-white rounded shadow">{page}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
