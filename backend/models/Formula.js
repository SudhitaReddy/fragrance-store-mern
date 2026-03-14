const mongoose = require("mongoose");

const formulaSchema = new mongoose.Schema({
  name: { type: String, required: true },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  version: { type: Number, required: true },

  chemicals: [
    {
      chemicalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chemical",
      },
      percent: Number,
    }
  ],

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