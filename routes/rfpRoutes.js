var express = require('express');
const { isAuthenticated, isGuest } = require('../middleware/isAuthenticated');
const { showRfpList, showAddRFP, showCategorySelection, handleCategorySelection, handleAddRFP, handleToggleStatus, showRFPQuotes } = require('../controllers/RfpController');
var router = express.Router();

router.get('/', isAuthenticated, showRfpList);
router.get('/category', isAuthenticated, showCategorySelection);
router.post('/category', isAuthenticated, handleCategorySelection);
router.get('/add', isAuthenticated, showAddRFP);
router.post('/add', isAuthenticated, handleAddRFP);
router.get('/view/:id', isAuthenticated, showRFPQuotes);
router.get('/toggle-status/:id/:status', isAuthenticated, handleToggleStatus);

module.exports = router;
