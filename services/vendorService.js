const CategoryModel = require("../models/CategoryModel");
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
const getCategoryDetailsByID = async (id) => {
  try {
    const connection = await getDBConnection();
    const result = await CategoryModel.getCategoryDetailsByID(connection, id);
    connection.release();
    return result;
  } catch (error) {
    throw error;
  }
};
const addCategory = async (data) => {
  try {
    const connection = await getDBConnection();
    const result = await CategoryModel.insertCategory(data, connection);
    connection.release();
    return result;
  } catch (error) {
    throw error;
  }
};
const updateCategory = async (id, data) => {
  try {
    const connection = await getDBConnection();
    const result = await CategoryModel.updateCategory(id, data, connection);
    connection.release();
    return result;
  } catch (error) {
    throw error;
  }
};
const toggleStatus = async (data) => {
  try {
    const connection = await getDBConnection();
    const result = await CategoryModel.toggleStatus(data, connection);
    connection.release();
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllVendors, addCategory, toggleStatus, getCategoryDetailsByID, updateCategory};