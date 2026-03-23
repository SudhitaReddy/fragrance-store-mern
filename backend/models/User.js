const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,

  email: { type: String, unique: true },

  password: String,

  // 🔐 Auth fields
  isVerified: {
    type: Boolean,
    default: false
  },

  otp: String,
  otpExpire: Date,

  resetToken: String,
  resetExpire: Date,

  // ✅ PROFILE FIELDS (ADD THESE)
  phone: {
    type: String,
    default: ""
  },

  company: {
    type: String,
    default: ""
  },

  address: {
    type: String,
    default: ""
  },

  avatar: {
    type: String, // image URL (future use)
    default: ""
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);