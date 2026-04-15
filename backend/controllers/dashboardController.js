const Chemical = require("../models/Chemical");
const Formula = require("../models/Formula");
const Category = require("../models/Category");

exports.getDashboardData = async (req, res) => {
  try {

    // TOTAL COUNTS
    const chemicalsCount = await Chemical.countDocuments({ isDeleted: { $ne: true } });
    const formulasCount = await Formula.countDocuments({ isDeleted: { $ne: true } });
    const categoriesCount = await Category.countDocuments({ isDeleted: { $ne: true } });

    // RECENT FORMULAS
    const recentFormulas = await Formula
      .find({ isDeleted: { $ne: true } })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name");

    // LOW STOCK CHEMICALS
    const lowStock = await Chemical
      .find({
        stock: { $lt: 1500 },
        isDeleted: { $ne: true }
      })
      .select("name stock")
      .limit(5);

    // CATEGORY DISTRIBUTION
  const categoryStats = await Chemical.aggregate([
  { $match: { isDeleted: { $ne: true } } },

  {
    $group: {
      _id: "$category",
      value: { $sum: 1 }
    }
  },

  {
    $lookup: {
      from: "categories", // ⚠️ collection name (IMPORTANT)
      localField: "_id",
      foreignField: "_id",
      as: "category"
    }
  },

  {
    $unwind: {
      path: "$category",
      preserveNullAndEmptyArrays: true
    }
  },

  {
    $project: {
      name: "$category.name", // ✅ THIS FIXES YOUR ISSUE
      value: 1
    }
  }
]);

    res.json({
      chemicals: chemicalsCount,
      formulas: formulasCount,
      categories: categoriesCount,
      recentFormulas,
      lowStock,
      categoryStats
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      msg: "Failed to load dashboard data"
    });

  }
};