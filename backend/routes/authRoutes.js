const express = require("express");
const router = express.Router();

const {
  signup,
  verifyOtp,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/verify", verifyOtp);
router.post("/login", login);
router.post("/forgot", forgotPassword);
router.post("/reset/:token", resetPassword);

module.exports = router;
