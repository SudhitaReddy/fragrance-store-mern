const Chemical = require("../models/Chemical");
const Category = require("../models/Category");

// CREATE CHEMICAL
exports.createChemical = async (req, res) => {
  try {

    const { name, category, stock, cost } = req.body;

    if (!name || !category || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name, category and stock are required",
      });
    }

    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid category"
      });
    }

    const chemical = await Chemical.create({
      name,
      category,
      stock,
      cost,
    });

    res.status(201).json({
      success: true,
      message: "Chemical created successfully",
      data: chemical,
    });

  } catch (error) {
    console.error("Create chemical error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating chemical",
    });
  }
};


// GET ALL CHEMICALS
exports.getChemicals = async (req, res) => {
  try {

    const chemicals = await Chemical
      .find({ isDeleted: { $ne: true } })
      .populate("category", "name color")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: chemicals.length,
      data: chemicals
    });

  } catch (error) {

    console.error("Get chemicals error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching chemicals"
    });

  }
};



exports.updateChemical = async (req, res) => {
  try {

    const { name, category, stock, cost } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: "Name and category are required"
      });
    }

    // verify category exists
    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid category"
      });
    }

    const chemical = await Chemical.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        stock,
        cost
      },
      { new: true }
    ).populate("category", "name color");

    if (!chemical) {
      return res.status(404).json({
        success: false,
        message: "Chemical not found"
      });
    }

    res.json({
      success: true,
      message: "Chemical updated successfully",
      data: chemical
    });

  } catch (error) {

    console.error("Update chemical error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};

exports.deleteChemical = async (req, res) => {
  try {

    const chemical = await Chemical.findById(req.params.id);

    if (!chemical) {
      return res.status(404).json({
        success: false,
        message: "Chemical not found",
      });
    }

    // move to recycle bin
    chemical.isDeleted = true;
    chemical.deletedAt = new Date();

    await chemical.save();

    res.json({
      success: true,
      message: "Chemical moved to recycle bin",
    });

  } catch (error) {

    console.error("Delete chemical error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });

  }
};

exports.getChemicalById = async (req, res) => {
  try {
    const chemical = await Chemical
      .findById(req.params.id)
      .populate("category", "name color");

    if (!chemical) {
      return res.status(404).json({
        success: false,
        message: "Chemical not found"
      });
    }

    res.json({
      success: true,
      data: chemical
    });

  } catch (error) {
    console.error("Get chemical error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};