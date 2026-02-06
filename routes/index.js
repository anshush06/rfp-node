var express = require('express');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const { showCategories } = require('../controllers/CategoryController');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('/dashboard');
});

router.get('/dashboard', isAuthenticated,function (req, res) {
  res.render('pages/dashboard');
});

router.get('/rfps', isAuthenticated,function (req, res, next) {
  res.render('pages/rfps');
});

router.get('/vendors', isAuthenticated,function (req, res, next) {
  res.render('pages/vendors');
});

router.get('/categories', isAuthenticated, showCategories);

module.exports = router;
