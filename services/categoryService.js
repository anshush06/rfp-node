const CategoryModel = require("../models/CategoryModel");
const { getDBConnection } = require("./databaseService");

const getAllCategories = async (page, limit) => {
  try {
    const connection = await getDBConnection();
    const result = await CategoryModel.getAllCategories(connection, page, limit);
    connection.release();
    return result;
  } catch (error) {
    throw error;
  }
};


module.exports = { getAllCategories };