const mongoose = require("mongoose");

const hardwareSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  type: {
    type: String,
    required: true
  },

  quantity: {
    type: Number,
    default: 0
  },

  notes: {
    type: String,
    default: ""
  },

  isDeleted: {
    type: Boolean,
    default: false
  },

  deletedAt: {
    type: Date,
    default: null
  }

}, { timestamps: true });

module.exports = mongoose.model("Hardware", hardwareSchema);