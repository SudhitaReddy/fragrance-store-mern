const express = require("express");
const router = express.Router();

const {
  createHardware,
  getHardware,
  updateHardware,
  deleteHardware
} = require("../controllers/hardwareController");


router.post("/", createHardware);
router.get("/", getHardware);
router.put("/:id", updateHardware);
router.delete("/:id", deleteHardware);


module.exports = router;