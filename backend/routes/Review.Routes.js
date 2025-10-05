const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/Auth.middleware");
const {addReviewController} = require("../controllers/Review.controller");

router.post("/add-review/:bookId", protect, addReviewController);

module.exports = router