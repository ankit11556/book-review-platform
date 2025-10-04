const Book = require("../models/Book.model");

//add book controller
exports.addBookController = async (req,res) => {
  try {
    const { title, author, description, genre, year} = req.body;

    const book = await Book.create({title, author, description, genre, year, addedBy: req.user._id})

    res.status(201).json({message: "Book Added Successfully",data: book})

  } catch (error) {
    res.status(500).json({message: "Book not added",error:error.message})
  }
}

//get all books
exports.getAllBooks = async (req,res) => {
  try {
    const page = Number(req.query.page) || 1; //default 1
    const limit = 5;
    const skip = (page - 1) * limit;

    const totalBookes = await Book.countDocuments();
    const totalPages = Math.ceil(totalBookes/limit)


    const books = await Book.find()
    .skip(skip)
    .limit(limit)
    .sort({createdAt: -1})

    res.status(200).json({
      currentPage: page,
      totalPages,
      totalBookes,
      books
    })
  } catch (error) {
   console.error("server error", error);
    res.status(500).json({message: "Server error" });
  }
}