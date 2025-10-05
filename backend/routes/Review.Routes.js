const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/Auth.middleware");
const {addReviewController,getReviewsByBookController} = require("../controllers/Review.controller");

router.post("/add-review/:bookId", protect, addReviewController);
router.get("/:bookId", getReviewsByBookController)

module.exports = router