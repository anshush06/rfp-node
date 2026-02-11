const RfpModel = require('../models/RfpModel');
const categoryService = require('../services/categoryService');
const rfpService = require('../services/rfpService');
const { getVendorsByCategory } = require('../services/VendorCategoryService');
const { validateRFPPayload } = require('../validations/rfpValidation');
require('dotenv').config();

const showRfpList = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = process.env.PAGINATION_LIMIT || 10;
    const currentUserID = req.user.id;
    const {
      rfps,
      totalPages,
      currentPage,
      totalRfps
    } = await rfpService.getRfpsByID(currentUserID, page, limit);
    res.render('pages/rfps', {
      rfps,
      totalPages,
      currentPage,
      totalRfps,
      limit
    });
  } catch (error) {
    req.flash('error', 'Failed to load RFPs: ' + error.message);
    res.redirect('/dashboard');
  }
};

const showCategorySelection = async (req, res, next) => {
  try {
    const categories = await categoryService.getAll();
    res.render('pages/categorySelection', {
      categories,
    });
  } catch (error) {
    req.flash('error', error.message);
    res.render('pages/categorySelection', {
      categories: [],
    });
  }
};

const handleCategorySelection = async (req, res, next) => {
  try {
    const { category_id } = req.body;
    if (!category_id) {
      throw new Error("Category ID Missing");
    }
    const vendors = await getVendorsByCategory(category_id);
    res.render('pages/addRfp', {
      category_id,
      rfp: {},
      vendors
    });
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/rfps/category');
  }
};

const showRFPQuotes = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("RFP ID Missing");
    }
    const page = parseInt(req.query.page) || 1;
    const limit = process.env.PAGINATION_LIMIT || 10;
    // check if the current user is vendor user then we will show the rfp quotes for that vendor only
    const isAdmin = req.user.role === "admin";
    const {
      quotes,
      totalPages,
      currentPage,
      totalQuotes
    } = await rfpService.getRfpQuotesByID(id, page, limit, isAdmin ? null : req.user.id);
    res.render('pages/rfpQuoteList', {
      quotes,
      totalPages,
      currentPage,
      totalQuotes,
      limit
    });
  } catch (error) {
    req.flash('error', 'Failed to load RFPs: ' + error.message);
    res.redirect('/dashboard');
  }
};

const showAddRFP = async (req, res, next) => {
  res.redirect('/rfps/category');
};

const handleAddRFP = async (req, res, next) => {
  let vendors = [];
  try {
    const data = req.body;
    if (data.category_id) {
      vendors = await getVendorsByCategory(data.category_id);
    }

    // Normalize vendors field for validation and service
    let v = data.vendors || data['vendors[]'] || [];
    // Always convert to array
    let vendorIds = Array.isArray(v) ? v : [v];
    // Remove empty values
    vendorIds = vendorIds.filter(id => id);
    // Assign back
    data.vendors = vendorIds;
    validateRFPPayload(data);
    data.created_by = req.user.id;
    const response = await rfpService.addRFP(data);

    if (!response) {
      req.flash('error', 'Something went wrong while adding RFP');
      return res.render('pages/addRfp', {
        category_id: data.category_id,
        rfp: data,
        vendors,
        error: 'Something went wrong'
      });
    }

    req.flash('success', 'RFP Added Successfully');
    res.redirect('/rfps');
  } catch (error) {
    res.render('pages/addRfp', {
      category_id: req.body.category_id,
      rfp: req.body,
      vendors,
      error: error.message
    });
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
      throw new Error('Invalid RFP id');
    }
    const response = await rfpService.toggleStatus({ id, status: newStatus });
    if (!response) {
      req.flash('error', 'Status Not Updated. Something went wrong');
    } else {
      req.flash('success', 'Status Updated Successfully');
    }
    res.redirect('/rfps');
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/rfps');
  }
};

module.exports = { showRfpList, showAddRFP, handleAddRFP, handleToggleStatus, showCategorySelection, handleCategorySelection, showRFPQuotes};