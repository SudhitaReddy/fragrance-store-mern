exports.calculateDilution = async (req, res) => {
  try {
    const { oil, strength } = req.body;

    const alcohol = oil * ((100 - strength) / strength);
    const total = oil + alcohol;

    res.json({
      oil,
      strength,
      alcohol,
      total
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};