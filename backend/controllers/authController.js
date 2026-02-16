const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");


// ================= SIGNUP =================
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await User.create({
      name,
      email,
      password: hash,
      otp,
      otpExpire: Date.now() + 10 * 60 * 1000,
    });

    await sendEmail(
      email,
      "Verify Your OTP",
      `Your OTP is ${otp}`
    );

    res.json({ msg: "OTP sent to email" });

  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};


// ================= VERIFY OTP =================
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "User not found" });

    if (user.otp !== otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpire = null;

    await user.save();

    res.json({ msg: "Account verified successfully" });

  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};


// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "Invalid email" });

    if (!user.isVerified) {
      return res.status(400).json({ msg: "Please verify your account" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user });

  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};


// ================= FORGOT PASSWORD =================
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.json({ msg: "If email exists, link sent" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    user.resetToken = token;
    user.resetExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    const link = `http://localhost:5173/reset/${token}`;

    await sendEmail(
      email,
      "Reset Password",
      `Click here to reset your password: ${link}`
    );

    res.json({ msg: "Reset link sent" });

  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};


// ================= RESET PASSWORD =================
exports.resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded.id,
      resetToken: token,
      resetExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ msg: "Invalid or expired link" });

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = null;
    user.resetExpire = null;

    await user.save();

    res.json({ msg: "Password updated successfully" });

  } catch (error) {
    res.status(400).json({ msg: "Invalid token" });
  }
};
