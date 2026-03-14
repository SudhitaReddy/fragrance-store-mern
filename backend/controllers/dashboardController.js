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
    const categoryStatsRaw = await Chemical.aggregate([
      { $match: { isDeleted: { $ne: true } } },
      {
        $group: {
          _id: "$category",
          value: { $sum: 1 }
        }
      }
    ]);

    const categoryStats = categoryStatsRaw.map(c => ({
      name: c._id || "Unknown",
      value: c.value
    }));

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