class CategoryModel {

  static async getAllCategories(conn) {
    const sql = `SELECT id, category_name FROM categories`;
    const [rows] = await conn.execute(sql);
    return rows;
  }

  static async insertCategory(data, conn) {
    const sql = `
      INSERT INTO categories (category_name)
      VALUES (?)
    `;
    const [result] = await conn.execute(sql, [
      data.category_name,
    ]);
    return result.insertId;
  }
}

module.exports = CategoryModel;
