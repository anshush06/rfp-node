const categoryService = require('../services/categoryService');

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories(req.conn);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllCategories };