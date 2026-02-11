const vendorService = require('../services/vendorService');
const { validateRFPQuotePayload } = require('../validations/rfpValidation');
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
    req.flash('error', 'Failed to load vendors: ' + error.message);
    res.redirect('/dashboard');
  }
};
const showRfpQuote = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = process.env.PAGINATION_LIMIT;
    const {
      rfps,
      totalPages,
      currentPage,
      totalRfps
    } = await vendorService.getAllQuotes(req.user.id, page, limit);
    res.render('pages/rfpQuotes', {
      rfps,
      totalPages,
      currentPage,
      totalRfps,
      limit
    });
  } catch (error) {
    req.flash('error', 'Failed to show rfp quote page: ' + error.message);
    res.redirect('/dashboard');
  }
};
const showAddRfpQuote = async (req, res, next) => {
  try {
    res.render('pages/addRfpQuote', {
      rfpId: req.params.id,
      data: [],
      error: ''
    });
  } catch (error) {
    res.render('pages/addRfpQuote', {
      rfpId: req.params.id,
      data: [],
      error: ''
    });
  }
};
const handleAddRfpQuote = async (req, res, next) => {
  let data = [];
  try {
    const {id} = req.params;
    const data = req.body;
    validateRFPQuotePayload(data);
    data.vendor_id = req.user.id;
    data.rfp_id = id;
    const response = await vendorService.addRFPQuote(id, data);
    if (!response) {
      req.flash('error', 'Something went wrong while adding RFP');
      return res.render('pages/addRfpQuote', {
        rfpId: req.params.id,
        data,
        error: 'Something went wrong'
      });
    }
    req.flash('success', 'RFP Quote Added Successfully');
    res.redirect('/vendors/rfp-quotes');
  } catch (error) {
    req.flash('error', error.message);
    res.render('pages/addRfpQuote', {
      rfpId: req.params.id,
      data: req.body,
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
      throw new Error('Invalid vendor id');
    }
    const response = await vendorService.toggleStatus(req.params);
    if (!response) {
      req.flash('error', 'Status Not Updated. Something went wrong');
    }
    if (Number(newStatus) === 1) {
      req.flash('success', 'Status updated and email sent successfully.');
    }
    else{ req.flash('success', 'Status updated successfully.'); }
    res.redirect('/vendors');
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/vendors');
  }
};

module.exports = { showVendors, handleToggleStatus, showRfpQuote, showAddRfpQuote, handleAddRfpQuote};