const VendorCategoryMapping = require("../models/VendorCategoryMapping");
const { getDBConnection } = require("./databaseService");

const getVendorsByCategory = async (id) => {
  let connection;
  try {
    connection = await getDBConnection();
    const result = await VendorCategoryMapping.getVendorsByCategory(id, connection);
    return result;
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getVendorsByCategory};