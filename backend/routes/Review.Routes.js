const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/Auth.middleware");
const {addReviewController,getReviewsByBookController,editReviewController,deleteReviewController} = 
require("../controllers/Review.controller");

router.post("/add-review/:bookId", protect, addReviewController);
router.get("/:bookId", getReviewsByBookController)
router.put("/:id", protect, editReviewController)
router.delete("/:id", protect, deleteReviewController)

module.exports = router