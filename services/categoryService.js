const CategoryModel = require("../models/CategoryModel");
const { getDBConnection } = require("./databaseService");

const getAllCategories = async () => {
  try {
    const connection = await getDBConnection();
    const categories = await CategoryModel.getAllCategories(connection);
    connection.release();
    return categories;
  } catch (error) {
    throw error;
  }
}

module.exports = { getAllCategories };