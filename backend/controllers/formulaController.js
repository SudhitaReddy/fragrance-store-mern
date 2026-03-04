const Formula = require("../models/Formula");

// 🔥 Create Formula (Auto Version + User Based)
exports.createFormula = async (req, res) => {
  try {
    const { name, chemicals } = req.body;

    // Count existing versions for same user
    const existing = await Formula.find({
      name,
      user: req.user._id,
    });

    const newVersion = existing.length + 1;

    const formula = await Formula.create({
      name,
      chemicals,
      version: newVersion,
      user: req.user._id,
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

    // Find existing formula
    const existingFormula = await Formula.findById(id);

    if (!existingFormula) {
      return res.status(404).json({ msg: "Formula not found" });
    }

    // Count versions for same name + user
    const existingVersions = await Formula.find({
      name: existingFormula.name,
      user: req.user._id,
    });

    const newVersion = existingVersions.length + 1;

    // Create new version
    const newFormula = await Formula.create({
      name: existingFormula.name,
      version: newVersion,
      chemicals,
      user: req.user._id,
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
      return res.status(404).json({ msg: "Formula not found" });
    }

    formula.isDeleted = true;
    await formula.save();

    res.json({ msg: "Formula deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};