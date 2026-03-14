const express = require("express");
const router = express.Router();

const {
  createDilution,
  getDilutions,
  getDilutionById,
  deleteDilution,
  updateDilution
} = require("../controllers/dilutionController");


router.post("/", createDilution);
router.get("/", getDilutions);
router.get("/:id", getDilutionById);
router.put("/:id", updateDilution);
router.delete("/:id", deleteDilution);

module.exports = router;