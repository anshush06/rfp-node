var express = require('express');
const { registerAsAdmin, showVendorRegistrationForm, registerAsVendor, loginUser } = require('../controllers/UserController');
const { isAuthenticated, isGuest } = require('../middleware/isAuthenticated');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', isGuest, (req, res)=> {
  res.render('auth/login', { email: '', password: '', error: req.query.msg || '' });
});
router.get('/register-admin', isGuest, (req, res)=> {
  res.render('auth/registerAdmin', { firstName: '', lastName: '',email: '', password: '', error: req.query.msg || '' });
});
router.post('/register-admin', registerAsAdmin);
router.get('/register-vendor', isGuest, showVendorRegistrationForm);
router.post('/register-vendor', registerAsVendor);
router.post('/login', loginUser);

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/users/login');
});

module.exports = router;
