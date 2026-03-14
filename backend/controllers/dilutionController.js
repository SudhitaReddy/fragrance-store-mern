const Dilution = require("../models/Dilution");
const Chemical = require("../models/Chemical");


// CREATE DILUTION
exports.createDilution = async (req, res) => {
  try {

    const { chemicalId, oilAmount, strength } = req.body;

    const oil = Number(oilAmount);
    const percent = Number(strength);

    const chemical = await Chemical.findById(chemicalId)
      .populate("category");

    if (!chemical) {
      return res.status(404).json({
        message: "Chemical not found"
      });
    }

    const alcoholAmount = oil * ((100 - percent) / percent);
    const totalVolume = oil + alcoholAmount;

    if (chemical.stock < oil) {
      return res.status(400).json({
        message: "Not enough stock"
      });
    }

    chemical.stock -= oil;
    await chemical.save();

    const dilution = await Dilution.create({
      chemical: chemical._id,
      chemicalName: chemical.name,
      category: chemical.category?._id,
      oilAmount: oil,
      alcoholAmount,
      strength: percent,
      totalVolume,
      batchNumber: `DIL-${Date.now()}`
    });

    res.json({
      success: true,
      data: dilution
    });

  } catch (error) {
    console.error("Create dilution error:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

exports.getDilutionById = async (req, res) => {
  try {

    const dilution = await Dilution
      .findById(req.params.id)
      .populate("chemical", "name category");

    if (!dilution) {
      return res.status(404).json({
        message: "Dilution not found"
      });
    }

    res.json({
      success: true,
      data: dilution
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET DILUTIONS
exports.getDilutions = async (req, res) => {

  try {

    const dilutions = await Dilution
      .find({ isDeleted: { $ne: true } })
      .populate("chemical", "name category");

    res.json({
      success: true,
      data: dilutions
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};

exports.updateDilution = async (req, res) => {

  try {

    const dilution = await Dilution.findById(req.params.id);

    if (!dilution) {
      return res.status(404).json({ message: "Dilution not found" });
    }

    const chemical = await Chemical.findById(dilution.chemical);

    // restore old oil
    chemical.stock += dilution.oilAmount;

    const { oilAmount, strength } = req.body;

    const alcoholAmount = oilAmount * ((100 - strength) / strength);
    const totalVolume = oilAmount + alcoholAmount;

    if (chemical.stock < oilAmount) {
      return res.status(400).json({
        message: "Not enough stock"
      });
    }

    chemical.stock -= oilAmount;

    await chemical.save();

    dilution.oilAmount = oilAmount;
    dilution.alcoholAmount = alcoholAmount;
    dilution.totalVolume = totalVolume;
    dilution.strength = strength;

    await dilution.save();

    res.json({
      success: true,
      data: dilution
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }

};

exports.deleteDilution = async (req, res) => {

  try {

    const dilution = await Dilution.findById(req.params.id);

    if (!dilution) {
      return res.status(404).json({
        success: false,
        message: "Dilution not found"
      });
    }

    // Restore chemical stock
    const chemical = await Chemical.findById(dilution.chemical);

    if (chemical) {
      chemical.stock += dilution.oilAmount;
      await chemical.save();
    }

    // Move dilution to recycle bin
    dilution.isDeleted = true;
    dilution.deletedAt = new Date();

    await dilution.save();

    res.json({
      success: true,
      message: "Dilution moved to recycle bin and stock restored"
    });

  } catch (error) {

    console.error("Delete dilution error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};