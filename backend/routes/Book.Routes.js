const express = require('express');
const router = express.Router();
const {protect} = require("../middlewares/Auth.middleware")
const {addBookController,getAllBooks} = require("../controllers/Book.controller")

router.post("/add-book", protect, addBookController);
router.get("/",getAllBooks)
module.exports = router