const mongoose = require("mongoose");

const chemicalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      trim : true,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    cost: {
      type: Number,
      default: 0,
      min: 0,
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
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chemical", chemicalSchema);