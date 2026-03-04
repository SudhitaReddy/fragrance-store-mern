const Chemical = require("../models/Chemical");

exports.createChemical = async (req, res) => {
  const chemical = await Chemical.create(req.body);
  res.json(chemical);
};

exports.getChemicals = async (req, res) => {
  const chemicals = await Chemical.find();
  res.json(chemicals);
};