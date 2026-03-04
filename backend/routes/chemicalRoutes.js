const express = require("express");
const router = express.Router();
const {
  createChemical,
  getChemicals,
} = require("../controllers/chemicalController");

router.post("/", createChemical);
router.get("/", getChemicals);

module.exports = router;