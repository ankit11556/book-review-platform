const express = require('express');
const router = express.Router();
const {protect} = require("../middlewares/Auth.middleware")
const {addBookController} = require("../controllers/Book.controller")

router.post("/add-book", protect, addBookController);

module.exports = router