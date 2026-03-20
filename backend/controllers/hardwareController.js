const Hardware = require("../models/Hardware");
const StockHistory = require("../models/StockHistory");


// ✅ CREATE
exports.createHardware = async (req, res) => {
  try {
    const hardware = await Hardware.create(req.body);

    res.json({
      success: true,
      data: hardware,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ✅ GET ALL (only active)
exports.getHardware = async (req, res) => {
  try {
    const items = await Hardware
      .find({ isDeleted: { $ne: true } })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: items,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ✅ GET SINGLE
exports.getSingleHardware = async (req, res) => {
  try {
    const item = await Hardware.findById(req.params.id);

    if (!item || item.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Hardware not found",
      });
    }

    res.json({
      success: true,
      data: item,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ✅ UPDATE (NO quantity update allowed)
exports.updateHardware = async (req, res) => {
  try {
    const { quantity, ...safeData } = req.body; // ❌ remove quantity

    const item = await Hardware.findByIdAndUpdate(
      req.params.id,
      safeData,
      { new: true }
    );

    res.json({
      success: true,
      data: item,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteHardware = async (req, res) => {
  try {
    const item = await Hardware.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    item.isDeleted = true;
    item.deletedAt = new Date();

    await item.save();

    res.json({
      success: true,
      message: "Moved to recycle bin",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ SOFT DELETE
exports.getDeletedHardware = async (req, res) => {
  try {
    const items = await Hardware
      .find({ isDeleted: true })
      .sort({ deletedAt: -1 });

    res.json({
      success: true,
      data: items,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ✅ RESTORE (VERY IMPORTANT)
exports.restoreHardware = async (req, res) => {
  try {
    const item = await Hardware.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    item.isDeleted = false;
    item.deletedAt = null;

    await item.save();

    res.json({
      success: true,
      message: "Item restored successfully",
      data: item,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ✅ ADJUST STOCK (CORE POS FEATURE)
exports.adjustStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, quantity, reason } = req.body;

    if (!["add", "reduce", "set"].includes(type)) {
      return res.status(400).json({
        message: "Invalid adjustment type",
      });
    }

    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be greater than 0",
      });
    }

    const item = await Hardware.findById(id);

    if (!item || item.isDeleted) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    const previousQty = item.quantity;
    let newQty = previousQty;

    if (type === "add") {
      newQty += quantity;
    } else if (type === "reduce") {
      newQty -= quantity;
      if (newQty < 0) newQty = 0;
    } else if (type === "set") {
      newQty = quantity;
    }

    item.quantity = newQty;
    await item.save();

    await StockHistory.create({
      hardwareId: item._id,
      type,
      quantity,
      previousQty,
      newQty,
      reason,
    });

    res.json({
      success: true,
      message: "Stock adjusted successfully",
      data: item,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};