const express = require("express");
const router = express.Router();
const { calculateDilution } = require("../controllers/dilutionController");

router.post("/calculate", calculateDilution);

module.exports = router;