const Formula = require("../models/Formula");
const Chemical = require("../models/Chemical");

// 🔥 Create Formula (Auto Version + User Based)
exports.createFormula = async (req, res) => {
  try {
    const { name, chemicals } = req.body;

    // 🔥 ADD THIS (VERY IMPORTANT)
   const formattedChemicals = chemicals.map((c, index) => ({
  chemicalId: c.chemicalId || null,
  name: c.name?.trim() || `Chemical ${index + 1}`, // ✅ FIX
  percent: c.percent
}));

    const formula = await Formula.create({
      name,
      chemicals: formattedChemicals, // ✅ USE THIS
      version: 1,
      user: req.user._id,
      parentFormula: null
    });

    res.status(201).json(formula);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔥 Get All Formulas (User Specific)
exports.getFormulas = async (req, res) => {
  try {
    const formulas = await Formula.find({
      user: req.user._id,
      isDeleted : false,
    }).populate("chemicals.chemicalId");

    res.json(formulas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔥 Edit Formula (Creates New Version)
exports.editFormula = async (req, res) => {
  try {
    const { id } = req.params;
    const { chemicals } = req.body;

    const existingFormula = await Formula.findById(id);

    if (!existingFormula) {
      return res.status(404).json({ msg: "Formula not found" });
    }

    const parentId = existingFormula.parentFormula || existingFormula._id;

    const existingVersions = await Formula.find({
      $or: [
        { _id: parentId },
        { parentFormula: parentId }
      ],
      user: req.user._id
    });

    const newVersion = existingVersions.length + 1;

    // 🔥 ADD THIS (VERY IMPORTANT)
    const formattedChemicals = chemicals.map((c, index) => ({
  chemicalId: c.chemicalId || null,
  name: c.name?.trim() || `Chemical ${index + 1}`, // ✅ FIX
  percent: c.percent
}));

    const newFormula = await Formula.create({
      name: existingFormula.name,
      version: newVersion,
      chemicals: formattedChemicals, // ✅ USE THIS
      user: req.user._id,
      parentFormula: parentId
    });

    res.json(newFormula);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔥 Copy Formula (Create New Version)
exports.copyFormula = async (req, res) => {
  try {
    const { id } = req.params;

    const existingFormula = await Formula.findById(id);

    if (!existingFormula) {
      return res.status(404).json({ msg: "Formula not found" });
    }

    // Count versions for same name + user
    const versions = await Formula.find({
      name: existingFormula.name,
      user: req.user._id,
    });

    const newVersion = versions.length + 1;

    const copiedFormula = await Formula.create({
      name: existingFormula.name,
      version: newVersion,
      chemicals: existingFormula.chemicals,
      user: req.user._id,
    });

    res.status(201).json(copiedFormula);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔥 Soft Delete Formula
exports.deleteFormula = async (req, res) => {
  try {

    const { id } = req.params;

    const formula = await Formula.findById(id);

    if (!formula) {
      return res.status(404).json({
        success: false,
        message: "Formula not found"
      });
    }

    // Move formula to recycle bin
    formula.isDeleted = true;
    formula.deletedAt = new Date();

    await formula.save();

    res.json({
      success: true,
      message: "Formula moved to recycle bin"
    });

  } catch (error) {

    console.error("Delete formula error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};

// 🔥 View Single Formula
exports.getFormulaById = async (req, res) => {
  try {
    const { id } = req.params;

    const formula = await Formula.findOne({
      _id: id,
      user: req.user._id,
      isDeleted: false,
    }).populate("chemicals.chemicalId");

    if (!formula) {
      return res.status(404).json({ msg: "Formula not found" });
    }

    res.json(formula);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFormulaVersions = async (req, res) => {
  try {
    const { id } = req.params;

    const formula = await Formula.findById(id);

    if (!formula) {
      return res.status(404).json({ msg: "Formula not found" });
    }

    const parentId = formula.parentFormula || formula._id;

    const versions = await Formula.find({
      $or: [
        { _id: parentId },
        { parentFormula: parentId }
      ],
      user: req.user._id
    })
    .sort({ version: -1 });

    res.json(versions);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔥 Produce Formula (Deduct Inventory)
exports.produceFormula = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body; // ml to produce

    const formula = await Formula.findById(id)
      .populate("chemicals.chemicalId");

    if (!formula) {
      return res.status(404).json({ msg: "Formula not found" });
    }

    for (const item of formula.chemicals) {

      if (!item.chemicalId) continue;

      const usedAmount = (quantity * item.percent) / 100;

      const chemical = await Chemical.findById(item.chemicalId._id);

      if (!chemical) continue;

      if (chemical.stock < usedAmount) {
        return res.status(400).json({
          msg: `Not enough stock for ${chemical.name}`,
        });
      }

      chemical.stock -= usedAmount;

      await chemical.save();
    }

    res.json({
      msg: "Production successful",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};