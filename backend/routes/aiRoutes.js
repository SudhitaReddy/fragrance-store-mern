const express = require("express");
const router = express.Router();
const { generateFormula } = require("../controllers/aiController");

router.post("/generate", generateFormula);

module.exports = router;