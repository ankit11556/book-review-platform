const Book = require("../models/Book.model");
const Review = require("../models/Review.model");

// add review
exports.addReviewController = async (req,res) => {
  try {
    const {bookId} = req.params;
    const {rating, reviewText} = req.body; 

    const book = await Book.findById(bookId); 
    if (!book) return res.status(404).json({ message: "Book not found" });

    const existing = await Review.findOne({bookId, userId: req.user._id});
    if (existing)
      return res.status(400).json({ message: "You already reviewed this book" });

    const review = await Review.create({
      bookId, 
      userId: req.user._id,
      rating, 
      reviewText
    })

    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// get reviews 
exports.getReviewsByBookController = async (req, res) => {
  try {
    const { bookId } = req.params;

    const reviews = await Review.find({ bookId }).populate("userId", "name email");

    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);

    res.status(200).json({ reviews, averageRating: avgRating.toFixed(1) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
