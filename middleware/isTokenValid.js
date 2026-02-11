const ResetPasswordTokenModel = require("../models/ResetPasswordTokenModel");
const { getDBConnection } = require("../services/databaseService");

const isTokenValid = async (req, res, next) => {
  try {
    const token = req.params.token;
    const conn = await getDBConnection();
    const tokenData = await ResetPasswordTokenModel.getResetToken(token, conn);
    if (!tokenData) {
      throw new Error("Invalid or expired reset link");
    }
    next();
  } catch (error) {
    res.render('auth/forgotPassword', {
      email: req.body.email,
      error: error.message
    });
  }
};

module.exports = isTokenValid;