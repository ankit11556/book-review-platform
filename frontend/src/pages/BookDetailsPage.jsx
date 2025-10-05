import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBookDetailsApi } from "../services/BookApi";
import { useAuth } from "../contexts/AuthContext";


const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);

  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState("");

  const {token} = useAuth()
  
  const fetchBook = async () => {
    try {
      setLoading(true);
      const res = await getBookDetailsApi(id);
      setBook(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!book) return <p className="text-center mt-10">Book not found!</p>;
  
  const hasReviewed = book.reviews?.some(r => r.user._id === userId);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-4xl font-bold text-gray-800">{book.title}</h1>
        <p className="text-gray-600 mt-2"><span className="font-medium">Author:</span> {book.author}</p>
        <p className="text-gray-600 mt-1"><span className="font-medium">Genre:</span> {book.genre}</p>
        <p className="text-gray-600 mt-1"><span className="font-medium">Published Year:</span> {book.year}</p>
        <p className="text-gray-700 mt-4">{book.description}</p>
        <p className="text-yellow-500 mt-4 text-lg">⭐ Average Rating: {book.averageRating || 0}</p>

        {/* Reviews */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reviews</h2>
          {book.reviews && book.reviews.length > 0 ? (
            book.reviews.map((review) => (
              <div key={review._id} className="border-b py-2">
                <p className="text-gray-700"><span className="font-medium">{review.user.name}:</span> {review.reviewText}</p>
                <p className="text-yellow-500">⭐ {review.rating}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>

        {/* Add Review Form */}
        {token && !hasReviewed && (
          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h3 className="text-xl font-semibold mb-2">Add Your Review</h3>
            <input
              type="number"
              min="1"
              max="5"
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
              placeholder="Rating (1-5)"
              className="border p-2 rounded w-full mb-2"
            />
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your review"
              className="border p-2 rounded w-full mb-2"
            />
            <button
              // onClick={handleAddReview}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded hover:scale-105 transform transition"
            >
              Submit Review
            </button>
          </div>
        )}

        {!token && (
          <p className="text-gray-500 mt-4">Login to add your review.</p>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
