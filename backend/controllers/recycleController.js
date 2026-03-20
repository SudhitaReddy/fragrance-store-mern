const Chemical = require("../models/Chemical");
const Category = require("../models/Category");
const Formula = require("../models/Formula");
const Dilution = require("../models/Dilution");
const Hardware = require("../models/Hardware");


/*
GET ALL RECYCLE BIN DATA
*/

exports.getRecycleBin = async (req, res) => {
  try {

    const chemicals = await Chemical.find({ isDeleted: true });
    const categories = await Category.find({ isDeleted: true });
    const formulas = await Formula.find({ isDeleted: true });
    const dilutions = await Dilution.find({ isDeleted: true });
    const hardware = await Hardware.find({ isDeleted: true }); // 🔥 ADD THIS

    res.json({
      success: true,
      data: {
        chemicals,
        categories,
        formulas,
        dilutions,
        hardware   // 🔥 VERY IMPORTANT
      }
    });

  } catch (error) {

    console.error("Recycle bin error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};



/*
RESTORE ITEM
*/

exports.restoreItem = async (req, res) => {

  try {

    const { type, id } = req.params;

    let Model;

    if (type === "chemical") Model = Chemical;
    if (type === "category") Model = Category;
    if (type === "formula") Model = Formula;
    if (type === "dilution") Model = Dilution;
    if (type === "hardware") Model = Hardware;

    if (!Model) {
      return res.status(400).json({
        success: false,
        message: "Invalid type"
      });
    }

    const item = await Model.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    item.isDeleted = false;
    item.deletedAt = null;

    await item.save();

    res.json({
      success: true,
      message: "Item restored successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};



/*
PERMANENT DELETE
*/

exports.permanentDelete = async (req, res) => {
  try {

    const { type, id } = req.params;

    let Model;

    if (type === "chemical") Model = Chemical;
    if (type === "category") Model = Category;
    if (type === "formula") Model = Formula;
    if (type === "dilution") Model = Dilution;
    if (type === "hardware") Model = Hardware; // 🔥 FIX

    if (!Model) {
      return res.status(400).json({
        success: false,
        message: "Invalid type"
      });
    }

    await Model.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Item permanently deleted"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};



/*
EMPTY RECYCLE BIN
*/

exports.emptyRecycleBin = async (req, res) => {

  try {

    await Chemical.deleteMany({ isDeleted: true });
    await Category.deleteMany({ isDeleted: true });
    await Formula.deleteMany({ isDeleted: true });
    await Dilution.deleteMany({ isDeleted: true });

    res.json({
      success: true,
      message: "Recycle bin emptied"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};