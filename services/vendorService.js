const VendorModel = require("../models/VendorModel");
const { getDBConnection } = require("./databaseService");
const sendMail = require("./sendMail");

const getAllVendors = async (page, limit) => {
  let connection;
  try {
    connection = await getDBConnection();
    const result = await VendorModel.getAllVendors(connection, page, limit);
    return result;
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

const toggleStatus = async (data) => {
  let connection;
  try {
    connection = await getDBConnection();
    const result = await VendorModel.toggleStatus(data, connection);

    // Send email if approved (status 1)
    if (result && Number(data.status) === 1) {
      const vendor = await VendorModel.getVendorByID(data.id, connection);
      if (vendor) {
        await sendMail(
          vendor.email,
          'Account Approved',
          `Dear ${vendor.firstname},\n\nYour vendor account has been approved by the admin. You can now log in and participate in RFPs.\n\nBest regards,\nRFP System Team`
        );
      }
    }

    return result;
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getAllVendors, toggleStatus};