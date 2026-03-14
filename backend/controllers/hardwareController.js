const Hardware = require("../models/Hardware");


exports.createHardware = async (req, res) => {

  try {

    const hardware = await Hardware.create(req.body);

    res.json({
      success: true,
      data: hardware
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


exports.getHardware = async (req, res) => {

  try {

    const items = await Hardware
      .find({ isDeleted: { $ne: true } })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: items
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


exports.updateHardware = async (req, res) => {

  try {

    const item = await Hardware.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: item
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


exports.deleteHardware = async (req, res) => {

  try {

    const item = await Hardware.findById(req.params.id);

    item.isDeleted = true;
    item.deletedAt = new Date();

    await item.save();

    res.json({
      success: true,
      message: "Moved to recycle bin"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};