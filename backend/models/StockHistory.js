const mongoose = require("mongoose");

const stockHistorySchema = new mongoose.Schema({

  hardwareId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hardware",
    required: true
  },

  type: {
    type: String,
    enum: ["add", "reduce", "set"],
    required: true
  },

  quantity: {
    type: Number,
    required: true
  },

  previousQty: {
    type: Number,
    required: true
  },

  newQty: {
    type: Number,
    required: true
  },

  reason: {
    type: String,
    default: ""
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("StockHistory", stockHistorySchema);