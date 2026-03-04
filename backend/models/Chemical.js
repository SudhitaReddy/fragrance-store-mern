const mongoose = require("mongoose");

const chemicalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        },
    stock: Number,
    cost: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chemical", chemicalSchema);