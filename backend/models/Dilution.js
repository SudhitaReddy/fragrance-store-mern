const mongoose = require("mongoose");

const dilutionSchema = new mongoose.Schema(
{
  chemical: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chemical",
    required: true
  },

  chemicalName: {
    type: String
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },

  oilAmount: {
    type: Number,
    required: true
  },

  alcoholAmount: {
    type: Number,
    required: true
  },

  strength: {
    type: Number,
    required: true
  },

  totalVolume: {
    type: Number,
    required: true
  },

  batchNumber: {
    type: String
  },

  notes: {
    type: String
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  isDeleted: {
    type: Boolean,
    default: false
  },

  deletedAt: {
    type: Date,
    default: null
  },

},
{ timestamps: true }
);

module.exports = mongoose.model("Dilution", dilutionSchema);