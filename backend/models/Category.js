const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    // 🎨 category color for UI
    color: {
      type: String,
      default: "#1890ff",
    },

    // optional icon (future UI improvement)
    icon: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",    
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

module.exports = mongoose.model("Category", categorySchema);