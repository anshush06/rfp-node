const VendorModel = require("../models/VendorModel");
const { getDBConnection } = require("./databaseService");

const getAllVendors = async (page, limit) => {
  try {
    const connection = await getDBConnection();
    const result = await VendorModel.getAllVendors(connection, page, limit);
    connection.release();
    return result;
  } catch (error) {
    throw error;
  }
};

const toggleStatus = async (data) => {
  try {
    const connection = await getDBConnection();
    const result = await VendorModel.toggleStatus(data, connection);
    connection.release();
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllVendors, toggleStatus};