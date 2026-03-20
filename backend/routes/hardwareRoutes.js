const express = require("express");
const router = express.Router();

const {
  createHardware,
  getHardware,
  updateHardware,
  getDeletedHardware,
  adjustStock,
  getSingleHardware,
  deleteHardware,        // ✅ ADD THIS
} = require("../controllers/hardwareController");

// ✅ ORDER MATTERS
router.get("/deleted", getDeletedHardware);

router.post("/", createHardware);
router.get("/", getHardware);
router.post("/adjust/:id", adjustStock);

router.get("/:id", getSingleHardware);
router.put("/:id", updateHardware);
router.delete("/:id", deleteHardware);   // 🔥 THIS FIXES YOUR ERROR

module.exports = router;