const RfpModel = require("../models/RfpModel");
const RfpQuoteModel = require("../models/RfpQuoteModel");
const RfpVendorMapping = require("../models/RfpVendorMapping");
const VendorModel = require("../models/VendorModel");
const { getDBConnection } = require("./databaseService");
const sendMail = require("./sendMail");

const getRfpsByID = async (id, page, limit) => {
  let connection;
  try {
    connection = await getDBConnection();
    const result = await RfpModel.getRfpsByID(connection, id, page, limit);
    return result;
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

const getRfpQuotesByID = async (id, page, limit, vendorId = null) => {
  let connection;
  try {
    connection = await getDBConnection();
    const result = await RfpQuoteModel.getRfpQuotesByID(connection, id, page, limit, vendorId);
    return result;
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
const addRFP = async (data) => {
  let connection;
  try {
    connection = await getDBConnection();
    await connection.beginTransaction();

    const resultId = await RfpModel.insertRfp(data, connection);

    if (data.vendors && Array.isArray(data.vendors)) {
      for (const vendorId of data.vendors) {
        await RfpVendorMapping.insertMapping(resultId, vendorId, connection);
      }
    }

    await connection.commit();

    // Send emails to assigned vendors
    if (data.vendors && data.vendors.length > 0) {
      const assignedVendors = await VendorModel.getVendorsByIDs(data.vendors, connection);
      for (const vendor of assignedVendors) {
        await sendMail(
          vendor.email,
          'New RFP Assigned',
          `Dear ${vendor.firstname},\n\nA new RFP "${data.item_name}" has been assigned to you. Please log in to the system to view details and submit your quote.\n\nBest regards,\nRFP System Team`
        );
      }
    }

    return resultId;
  } catch (error) {
    if (connection) await connection.rollback();
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

const toggleStatus = async (data) => {
  let connection;
  try {
    connection = await getDBConnection();
    const result = await RfpModel.toggleStatus(data, connection);
    return result;
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { addRFP, toggleStatus, getRfpsByID, getRfpQuotesByID};