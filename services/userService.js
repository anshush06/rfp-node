const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');
const { validateRegisterPayload, validateRegisterPayloadForVendor } = require('../validations/registerValidator');
const { getDBConnection } = require('./databaseService');
const VendorModel = require('../models/VendorModel');
const VendorCategoryMappingModel = require('../models/VendorCategoryMapping');
const CategoryModel = require('../models/CategoryModel');
const sendMail = require('./sendMail');
const crypto = require('crypto');
const { storeResetToken } = require('../models/ResetPasswordTokenModel');
const ResetPasswordTokenModel = require('../models/ResetPasswordTokenModel');

const loginUser = async (email, password) => {
  const connection = await getDBConnection();
  try {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    // Check in users table first
    let user = await UserModel.getUserByEmail(email, connection);
    let isVendor = false;
    if (!user) {
      // Check in vendors table
      user = await VendorModel.getUserByEmail(email, connection);
      isVendor = true;
    }
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }
    // Add role information
    user.role = isVendor ? 'vendor' : 'admin';
    return user;
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

const registerAsAdmin = async (data) => {
  const connection = await getDBConnection();
  try {
    await connection.beginTransaction();
    validateRegisterPayload(data, 'vendor');
    const { firstName, lastName, email, password } = data;
    // Check email uniqueness
    const existingUser = await UserModel.getUserByEmail(email, connection);
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    // Insert user
    const userId = await UserModel.insertUser(
      { firstName, lastName, email, password: hashedPassword },
      connection
    );
    // Commit transaction
    await connection.commit();
    // Now we will send the notification email to the vendor about successful registration
    await sendMail(email, 'Admin Registration Successful', `Dear ${firstName},\n\nYour registration as an Admin was successful.\n\nBest regards,\nRFP System Team`);
    return { success: true, userId };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const registerAsVendor = async (data) => {
  const connection = await getDBConnection();
  try {
    await connection.beginTransaction();
    validateRegisterPayloadForVendor(data);
    const { firstName, lastName, email, password, revenue, noOfEmployees, gstNo, panNo, phoneNo } = data;
    let categories = data.categories || data['categories[]'];

    // Ensure categories is an array
    if (!Array.isArray(categories)) {
      categories = categories ? [categories] : [];
    }

    // Check if "All Categories" (empty string) is selected
    const isAllSelected = categories.some(cat => cat === '0');

    if (isAllSelected) {
      const allCategories = await CategoryModel.getAllCategories(connection);
      categories = allCategories.map(cat => cat.id);
    } else {
      categories = categories.filter(id => id && id.toString().trim() !== '0');
    }
    // Check email uniqueness
    const existingUser = await VendorModel.getUserByEmail(email, connection);
    if (existingUser) {
      throw new Error("Vendor already exists");
    }
    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    // Insert user
    const userId = await VendorModel.insertUser(
      { firstName, lastName, email, password: hashedPassword, revenue, noOfEmployees, gstNo, panNo, phoneNo },
      connection
    );
    // Now we will enter the vendor categories mapping/ Assuming this is an array of category IDs
    for (const categoryId of categories) {
      await VendorCategoryMappingModel.insertMapping({ category_id: categoryId, vendor_id: userId }, connection);
    }
    // Commit transaction
    await connection.commit();
    // Now we will send the notification email to the vendor about successful registration
    await sendMail(email, 'Vendor Registration Successful', `Dear ${firstName},\n\nYour registration as a vendor was successful.\n\nBest regards,\nRFP System Team`);
    return { success: true, userId };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const handleForgotPassword = async (email) => {
  const conn = await getDBConnection();
  try {
    let user = await UserModel.getUserByEmail(email, conn);
    let role = 'admin';
    if (!user) {
      user = await VendorModel.getUserByEmail(email, conn);
      role = 'vendor';
    }
    if (!user) {
      throw new Error("Email does not exist");
    }
    const token = await generateResetToken(user.id, role, conn);
    const resetLink = `${process.env.APP_URL}/users/reset-password/${token}`;
    await sendMail(
      email,
      'Password Reset Instructions',
      `Dear ${user.firstname},

      Please reset your password using the link below:
      ${resetLink}

      This link will expire in 1 hour.

      Regards,
      RFP System Team`
    );
  } finally {
    conn.release();
  }
};

const generateResetToken = async (userId, role, conn) => {
  const token = crypto.randomBytes(32).toString('hex');
  const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  await storeResetToken({ user_id: userId, role, token, expiry },conn);
  return token;
};

const handleResetPassword = async (token, password) => {
  const conn = await getDBConnection();
  try {
    const tokenData = await ResetPasswordTokenModel.getResetToken(token, conn);
    if (!tokenData) {
      throw new Error("Invalid or expired reset link");
    }
    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    await UserModel.updatePassword({
      userId: tokenData.user_id,
      role: tokenData.role,
      password: hashedPassword
    }, conn);
    await ResetPasswordTokenModel.markTokenUsed(token, conn);
  } finally {
    conn.release();
  }
};


module.exports = { loginUser, registerAsAdmin, registerAsVendor, handleForgotPassword, generateResetToken, handleResetPassword };
