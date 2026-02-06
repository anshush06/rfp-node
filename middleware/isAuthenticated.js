const { verifyToken } = require('../utils/jwt');

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/users/login');
  }
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    res.locals.user = decoded;
    console.log("Middleware - res.locals.user set to:", JSON.stringify(res.locals.user));
    return next();
  } catch (err) {
    res.clearCookie('token');
    return res.redirect('/users/login?msg=Session expired. Please login again.');
  }
};

const isGuest = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next();
  }

  try {
    verifyToken(token);
    return res.redirect('/dashboard');
  } catch (err) {
    res.clearCookie('token');
    return next();
  }
};

module.exports = { isAuthenticated, isGuest };
