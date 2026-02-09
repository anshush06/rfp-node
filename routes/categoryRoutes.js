var express = require('express');
const { isAuthenticated, isGuest } = require('../middleware/isAuthenticated');
const { showEditCategory, showAddCategory, showCategories, handleAddCategory, handleToggleStatus, handleEditCategory } = require('../controllers/CategoryController');
var router = express.Router();

router.get('/', isAuthenticated, showCategories);
router.get('/add', isAuthenticated, showAddCategory);
router.get('/edit/:id', isAuthenticated, showEditCategory);
router.post('/add', isAuthenticated, handleAddCategory);
router.post('/edit/:id', isAuthenticated, handleEditCategory);
router.get('/toggle-status/:id/:status', isAuthenticated, handleToggleStatus);

module.exports = router;
