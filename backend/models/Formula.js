const mongoose = require("mongoose");

const formulaSchema = new mongoose.Schema({

  name: { 
    type: String, 
    required: true 
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // 🔥 VERSION SYSTEM
  version: { 
    type: Number, 
    required: true 
  },

  parentFormula: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Formula",
    default: null
  },

  // 🔥 CHEMICALS (AI SAFE)
  chemicals: [
    {
      chemicalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chemical",
        default: null
      },

      name: {   // 🔥 ADD THIS (VERY IMPORTANT)
        type: String,
        default: ""
      },

      percent: Number,
    }
  ],

  // 🔥 SOFT DELETE
  isDeleted: {
    type: Boolean,
    default: false
  },

  deletedAt: {
    type: Date,
    default: null
  },

}, { timestamps: true });

module.exports = mongoose.model("Formula", formulaSchema);