const express = require('express');
const router = express.Router();
const {protect} = require("../middlewares/Auth.middleware")
const {addBookController,getAllBooksController,getBookDetailsController,deleteBookController,editBookController} = 
require("../controllers/Book.controller")

router.post("/add-book", protect, addBookController);
router.get("/", getAllBooksController)
router.get("/:id", getBookDetailsController)
router.delete("/:id", protect, deleteBookController)
router.put("/:id", protect, editBookController)
module.exports = router