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
    const categories = await categoryService.getAll();
    res.render('auth/registerVendor', { firstName: '', lastName: '', email: '', revenue: '', noOfEmployees: '', gstNo: '', panNo: '', phoneNo: '', error: req.query.msg || '', categories });
  } catch (error) {
    res.render('auth/registerVendor', { firstName: '', lastName: '', email: '', revenue: '', noOfEmployees: '', gstNo: '', panNo: '', phoneNo: '', error: error.message || '', categories: [] });
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
      categories: await categoryService.getAll()
    });
  }
};

const handleForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new Error("Email is required");
    }
    await userService.handleForgotPassword(email);
    res.redirect('/users/login?msg=Reset instructions were sent');
  } catch (error) {
    res.render('auth/forgotPassword', {
      email: req.body.email,
      error: error.message
    });
  }
};

const handleResetPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    const { token } = req.params;
    if (!password || !confirmPassword) {
      throw new Error("All fields are required");
    }
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
    await userService.handleResetPassword(token, password);
    res.redirect('/users/login?msg=Password reset successfully');
  } catch (error) {
    res.render('auth/resetPassword', {
      error: error.message,
      token: req.params.token
    });
  }
};

module.exports = { loginUser, registerAsAdmin, showVendorRegistrationForm, registerAsVendor, handleForgotPassword, handleResetPassword };
