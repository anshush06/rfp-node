var express = require('express');
const { isAuthenticated } = require('../middleware/isAuthenticated');
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

module.exports = router;
