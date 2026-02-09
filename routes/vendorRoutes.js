var express = require('express');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const { showVendors,handleToggleStatus } = require('../controllers/VendorController');
var router = express.Router();

router.get('/', isAuthenticated, showVendors);
router.get('/toggle-status/:id/:status', isAuthenticated, handleToggleStatus);

module.exports = router;
