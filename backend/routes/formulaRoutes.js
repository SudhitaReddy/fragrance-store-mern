const express = require("express");
const router = express.Router();
const {
  createFormula,
  getFormulas,
  editFormula,
  copyFormula,
  deleteFormula,
  getFormulaById,
  produceFormula,
  getFormulaVersions

} = require("../controllers/formulaController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createFormula);
router.get("/", protect, getFormulas);
router.put("/:id", protect, editFormula);
router.post("/copy/:id", protect, copyFormula);
router.delete("/:id", protect, deleteFormula);
router.get("/:id", protect, getFormulaById);
router.post("/produce/:id", protect, produceFormula);
router.get("/versions/:id", protect, getFormulaVersions);

module.exports = router;