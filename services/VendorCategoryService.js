const VendorCategoryMapping = require("../models/VendorCategoryMapping");
const { getDBConnection } = require("./databaseService");

const getVendorsByCategory = async (id) => {
  try {
    const connection = await getDBConnection();
    const result = await VendorCategoryMapping.getVendorsByCategory(id, connection);
    connection.release();
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { getVendorsByCategory};