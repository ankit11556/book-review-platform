import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBookApi } from "../services/BookApi";

const AddBook = () => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    year: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await addBookApi(bookData)
      alert(res.data.message);
      navigate("/"); 
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Add New Book</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={bookData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={bookData.author}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={bookData.genre}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="number"
            name="year"
            placeholder="Published Year"
            value={bookData.year}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={bookData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded hover:scale-105 transform transition"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
