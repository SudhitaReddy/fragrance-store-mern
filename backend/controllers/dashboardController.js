const Chemical = require("../models/Chemical");
const Formula = require("../models/Formula");
const Category = require("../models/Category");

exports.getDashboardData = async (req, res) => {
  try {

    // Count statistics
    const chemicalsCount = await Chemical.countDocuments();
    const formulasCount = await Formula.countDocuments();
    const categoriesCount = await Category.countDocuments();

    // Recent formulas
    const recentFormulas = await Formula.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      chemicals: chemicalsCount,
      formulas: formulasCount,
      categories: categoriesCount,
      recentFormulas
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Failed to load dashboard data"
    });
  }
};