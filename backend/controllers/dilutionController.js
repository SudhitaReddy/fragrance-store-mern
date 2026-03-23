const Dilution = require("../models/Dilution");
const Chemical = require("../models/Chemical");

const TOTAL_VOLUME = 100;

// CREATE DILUTION
const createDilution = async (req, res) => {
  try {
    let { chemicalId, oilAmount } = req.body;

    oilAmount = Number(oilAmount);

    if (!chemicalId || isNaN(oilAmount)) {
      return res.status(400).json({
        success: false,
        message: "Invalid input"
      });
    }

    if (oilAmount > TOTAL_VOLUME) {
      return res.status(400).json({
        success: false,
        message: "Oil cannot exceed 100 ml"
      });
    }

    const chemical = await Chemical.findById(chemicalId);

    if (!chemical) {
      return res.status(404).json({
        success: false,
        message: "Chemical not found"
      });
    }

    if (chemical.stock < oilAmount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock"
      });
    }

    const alcoholAmount = TOTAL_VOLUME - oilAmount;

    // Deduct stock
    chemical.stock -= oilAmount;
    await chemical.save();

    const dilution = await Dilution.create({
      chemical: chemicalId,
      chemicalName: chemical.name,
      category: chemical.category,
      oilAmount,
      alcoholAmount,
      totalVolume: TOTAL_VOLUME,
      batchNumber: `BATCH-${Date.now()}`
    });

    res.status(201).json({
      success: true,
      data: dilution
    });

  } catch (error) {
    console.error("🔥 Dilution Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// GET ALL DILUTIONS
const getDilutions = async (req, res) => {
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

// GET SINGLE DILUTION
const getDilutionById = async (req, res) => {
  try {
    const dilution = await Dilution
      .findById(req.params.id)
      .populate("chemical", "name category");

    if (!dilution) {
      return res.status(404).json({
        success: false,
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

// UPDATE DILUTION
const updateDilution = async (req, res) => {
  try {
    let { oilAmount } = req.body;
    oilAmount = Number(oilAmount);

    if (isNaN(oilAmount) || oilAmount > TOTAL_VOLUME) {
      return res.status(400).json({
        message: "Invalid oil amount"
      });
    }

    const dilution = await Dilution.findById(req.params.id);

    if (!dilution) {
      return res.status(404).json({
        message: "Dilution not found"
      });
    }

    const chemical = await Chemical.findById(dilution.chemical);

    // Restore old stock
    chemical.stock += dilution.oilAmount;

    if (chemical.stock < oilAmount) {
      return res.status(400).json({
        message: "Not enough stock"
      });
    }

    const alcoholAmount = TOTAL_VOLUME - oilAmount;

    // Deduct new stock
    chemical.stock -= oilAmount;
    await chemical.save();

    dilution.oilAmount = oilAmount;
    dilution.alcoholAmount = alcoholAmount;
    dilution.totalVolume = TOTAL_VOLUME;

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

// DELETE DILUTION (SOFT DELETE)
const deleteDilution = async (req, res) => {
  try {
    const dilution = await Dilution.findById(req.params.id);

    if (!dilution) {
      return res.status(404).json({
        success: false,
        message: "Dilution not found"
      });
    }

    const chemical = await Chemical.findById(dilution.chemical);

    if (chemical) {
      chemical.stock += dilution.oilAmount;
      await chemical.save();
    }

    dilution.isDeleted = true;
    dilution.deletedAt = new Date();

    await dilution.save();

    res.json({
      success: true,
      message: "Moved to recycle bin & stock restored"
    });

  } catch (error) {
    console.error("Delete dilution error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports = {
  createDilution,
  getDilutions,
  getDilutionById,
  updateDilution,
  deleteDilution
};