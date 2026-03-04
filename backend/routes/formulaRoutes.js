const express = require("express");
const router = express.Router();
const {
  createFormula,
  getFormulas,
  editFormula,
  copyFormula,
  deleteFormula
} = require("../controllers/formulaController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createFormula);
router.get("/", protect, getFormulas);
router.put("/:id", protect, editFormula);
router.post("/copy/:id", protect, copyFormula);
router.delete("/:id", protect, deleteFormula);

module.exports = router;