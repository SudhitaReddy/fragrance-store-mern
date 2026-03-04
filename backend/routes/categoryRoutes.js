const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createCategory);
router.get("/", protect, getCategories);
router.delete("/:id", protect, deleteCategory);

module.exports = router;