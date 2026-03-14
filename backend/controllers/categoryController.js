const Category = require("../models/Category");
const Chemical = require("../models/Chemical");


// CREATE CATEGORY
exports.createCategory = async (req, res) => {
  try {

    const { name, description, color } = req.body;

    const category = await Category.create({
      name,
      description,
      color
    });

    res.status(201).json({
      success: true,
      data: category
    });

  } catch (err) {

    console.error("Create category error:", err);

    res.status(500).json({
      success: false,
      msg: err.message
    });

  }
};



// GET ALL CATEGORIES
exports.getCategories = async (req, res) => {
  try {

   const categories = await Category.find({ isDeleted: { $ne: true } });

    // add chemicals count
    const result = await Promise.all(
      categories.map(async (cat) => {

        const count = await Chemical.countDocuments({
          category: cat._id
        });

        return {
          ...cat._doc,
          chemicalsCount: count
        };

      })
    );

    res.json({
      success: true,
      data: result
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      msg: err.message
    });

  }
};



// GET SINGLE CATEGORY
exports.getCategoryById = async (req, res) => {
  try {

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        msg: "Category not found"
      });
    }

    res.json({
      success: true,
      data: category
    });

  } catch (err) {

    res.status(500).json({
      msg: err.message
    });

  }
};



// UPDATE CATEGORY
exports.updateCategory = async (req, res) => {
  try {

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        msg: "Category not found"
      });
    }

    res.json({
      success: true,
      data: category
    });

  } catch (err) {

    res.status(500).json({
      msg: err.message
    });

  }
};



// DELETE CATEGORY
exports.deleteCategory = async (req, res) => {
  try {

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    // Move category to recycle bin
    category.isDeleted = true;
    category.deletedAt = new Date();

    await category.save();

    res.json({
      success: true,
      message: "Category moved to recycle bin"
    });

  } catch (err) {

    console.error("Delete category error:", err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};

