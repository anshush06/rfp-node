var express = require('express');
const { registerAsAdmin, showVendorRegistrationForm, registerAsVendor, loginUser, handleForgotPassword, handleResetPassword } = require('../controllers/UserController');
const { isAuthenticated, isGuest } = require('../middleware/isAuthenticated');
const isTokenValid = require('../middleware/isTokenValid');
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

// forgot and reset password routes
router.get('/forgot-password', isGuest, (req, res)=> {
  res.render('auth/forgotPassword', { email: '', error: req.query.msg || '' });
});
router.post('/forgot-password', handleForgotPassword);

router.get('/reset-password/:token', isTokenValid, (req, res)=> {
  res.render('auth/resetPassword', { token: req.params.token });
});
router.post('/reset-password/:token', handleResetPassword);

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/users/login');
});

module.exports = router;
