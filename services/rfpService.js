const RfpModel = require("../models/RfpModel");
const RfpVendorMapping = require("../models/RfpVendorMapping");
const { getDBConnection } = require("./databaseService");

const getRfpsByID = async (id, page, limit) => {
  try {
    const connection = await getDBConnection();
    const result = await RfpModel.getRfpsByID(connection, id, page, limit);
    connection.release();
    return result;
  } catch (error) {
    throw error;
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
    return resultId;
  } catch (error) {
    if (connection) await connection.rollback();
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

const toggleStatus = async (data) => {
  try {
    const connection = await getDBConnection();
    const result = await RfpModel.toggleStatus(data, connection);
    connection.release();
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { addRFP, toggleStatus, getRfpsByID };