const categoryService = require('../services/categoryService');
require('dotenv').config();

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories(req.conn);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const showCategories = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = process.env.PAGINATION_LIMIT;
    const {
      categories,
      totalPages,
      currentPage,
      totalCategories
    } = await categoryService.getAllCategories(page, limit);
    res.render('pages/categories', {
      categories,
      totalPages,
      currentPage,
      totalCategories,
      limit
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllCategories, showCategories};