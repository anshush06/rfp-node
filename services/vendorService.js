const RfpModel = require("../models/RfpModel");
const UserModel = require("../models/UserModel");
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

const addRFPQuote = async (id, data) => {
  let connection;
  try {
    connection = await getDBConnection();
    await connection.beginTransaction();
    // first check if the RFP exists for which vendor is adding the Quote.
    const rfpDetails = await RfpModel.getRfpByID(id, connection);
    if(!rfpDetails){
      throw new error("RFP doesn't exist");
    }
    const resultId = await VendorModel.insertRfp(data, connection);
    await connection.commit();
    // Send emails to admin
    // first fetch the details of the user from users table
    const adminUser = await UserModel.getUserByID(rfpDetails.created_by, connection);
    if(adminUser){
      await sendMail(
        adminUser.email,
        'New RFP Quote Assigned',
        `Dear ${adminUser.firstname},\n\nA new RFP Quote has been assigned to you for RFP-${rfpDetails.rfp_number}.`
      );
    }

    return resultId;
  } catch (error) {
    if (connection) await connection.rollback();
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

const getAllQuotes = async (vendorId, page, limit) => {
  let connection;
  try {
    connection = await getDBConnection();
    const result = await VendorModel.getAllQuotes(connection, vendorId, page, limit);
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

module.exports = { getAllVendors, toggleStatus, getAllQuotes, addRFPQuote};