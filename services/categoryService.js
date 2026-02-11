const CategoryModel = require("../models/CategoryModel");
const { getDBConnection } = require("./databaseService");

const getAllCategories = async (page, limit) => {
  let connection;
  try {
    connection = await getDBConnection();
    const result = await CategoryModel.getAllCategories(connection, page, limit);
    return result;
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
const getAll = async () => {
  let connection;
  try {
    connection = await getDBConnection();
    const result = await CategoryModel.getAll(connection);
    return result;
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
const getCategoryDetailsByID = async (id) => {
  let connection;
  try {
    connection = await getDBConnection();
    const result = await CategoryModel.getCategoryDetailsByID(connection, id);
    return result;
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
const addCategory = async (data) => {
  let connection;
  try {
    connection = await getDBConnection();
    const result = await CategoryModel.insertCategory(data, connection);
    return result;
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
const updateCategory = async (id, data) => {
  let connection;
  try {
    connection = await getDBConnection();
    const result = await CategoryModel.updateCategory(id, data, connection);
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
    const result = await CategoryModel.toggleStatus(data, connection);
    return result;
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getAllCategories, addCategory, toggleStatus, getCategoryDetailsByID, updateCategory, getAll };