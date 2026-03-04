const Category = require("../models/Category");
const Chemical = require("../models/Chemical");

// Create Category
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get All Categories
exports.getCategories = async (req, res) => {
  try {

    const categories = await Category.find({});

    res.json(categories);

  } catch (err) {

    res.status(500).json({
      msg: err.message
    });

  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ msg: "Category deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};