const express = require("express");
const router = express.Router();

const {
  createChemical,
  getChemicals,
  updateChemical,
  deleteChemical,
  getChemicalById
} = require("../controllers/chemicalController");

router.post("/", createChemical);
router.get("/", getChemicals);
router.get("/:id", getChemicalById);
router.put("/:id", updateChemical);
router.delete("/:id", deleteChemical);

module.exports = router;