const userService = require('../services/userService');
const categoryService = require('../services/categoryService');
const { generateToken } = require('../utils/jwt');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    if (user) {
      // now here we will generate the token and set it in the cookie
      const token = generateToken({
        id: user.id,
        email: user.email,
        first_name: user.firstname,
        role: user.role
      });
      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
      });
      req.flash('success', 'Login successful');
      return res.redirect('/dashboard');
    }
  } catch (error) {
    res.render('auth/login', {
      error: error.message,
      email: req.body.email
    });
  }
};

const registerAsAdmin = async (req, res) => {
  try {
    await userService.registerAsAdmin(req.body);
    res.render('auth/login', { error: '', email: '' });
  } catch (error) {
    res.render('auth/registerAdmin', {
      error: error.message,
      ...req.body
    });
  }
};

const showVendorRegistrationForm = async (req, res) => {
  try {
    // fetch all the categores from the database
    const categories = await categoryService.getAllCategories();
    res.render('auth/registerVendor', {firstName: '', lastName: '', email: '', revenue: '', noOfEmployees: '',gstNo: '',panNo: '',phoneNo: '', error: req.query.msg || '', categories });
  } catch (error) {
    res.render('auth/registerVendor', {firstName: '', lastName: '', email: '', revenue: '', noOfEmployees: '',gstNo: '',panNo: '',phoneNo: '', error: error.message || '', categories: [] });
  }
}

const registerAsVendor = async (req, res) => {
  try {
    await userService.registerAsVendor(req.body);
    res.render('auth/login', { ...req.body, error: '' });
  } catch (error) {
    console.log(error);
    res.render('auth/registerVendor', {
      error: error.message,
      ...req.body,
      categories: await categoryService.getAllCategories()
    });
  }
};

module.exports = { loginUser, registerAsAdmin, showVendorRegistrationForm,registerAsVendor };
