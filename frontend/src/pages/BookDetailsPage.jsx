import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBookDetailsApi } from "../services/BookApi";


const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);

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
      </div>
    </div>
  );
};

export default BookDetails;
