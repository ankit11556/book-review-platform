const Book = require("../models/Book.model");

exports.addBookController = async (req,res) => {
  try {
    const { title, author, description, genre, year} = req.body;

    const book = await Book.create({title, author, description, genre, year, addedBy: req.user._id})

    res.status(201).json({message: "Book Added Successfully",data: book})

  } catch (error) {
    res.status(500).json({message: "Book not added",error:error.message})
  }
}