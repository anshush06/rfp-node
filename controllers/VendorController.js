const vendorService = require('../services/vendorService');
require('dotenv').config();

const showVendors = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = process.env.PAGINATION_LIMIT;
    const {
      vendors,
      totalPages,
      currentPage,
      totalVendors
    } = await vendorService.getAllVendors(page, limit);
    res.render('pages/vendors', {
      vendors,
      totalPages,
      currentPage,
      totalVendors,
      limit
    });
  } catch (error) {
    next(error);
  }
};
const handleToggleStatus = async (req, res, next) => {
  try {
    const newStatus = Number(req.params.status);
    const id = req.params.id;
    if (![0, 1].includes(newStatus)) {
      throw new Error('Invalid status value');
    }
    if (!id) {
      throw new Error('Invalid vendor id');
    }
    const response = await vendorService.toggleStatus(req.params);
    if(!response){
      req.flash('error', 'Status Not Updated. Something went wrong');
    }
    req.flash('success', 'Status Updated Successfully');
    res.redirect('/vendors');
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/vendors');
  }
};

module.exports = {showVendors, handleToggleStatus};