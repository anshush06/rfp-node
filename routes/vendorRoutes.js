var express = require('express');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const { showVendors,handleToggleStatus, showRfpQuote, showAddRfpQuote, handleAddRfpQuote } = require('../controllers/VendorController');
var router = express.Router();

router.get('/', isAuthenticated, showVendors);
router.get('/rfp-quotes', isAuthenticated, showRfpQuote);
router.get('/add/:id', isAuthenticated, showAddRfpQuote);
router.post('/add/:id', isAuthenticated, handleAddRfpQuote);
router.get('/toggle-status/:id/:status', isAuthenticated, handleToggleStatus);

module.exports = router;
