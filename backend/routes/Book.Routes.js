const express = require('express');
const router = express.Router();
const {protect} = require("../middlewares/Auth.middleware")
const {addBookController,getAllBooksController,getBookDetailsController} = require("../controllers/Book.controller")

router.post("/add-book", protect, addBookController);
router.get("/", getAllBooksController)
router.get("/:id", getBookDetailsController)
module.exports = router