class CategoryModel {

  static async getAllCategories(conn, page, limit) {
    try {
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      const offset = (page - 1) * limit;
      const dataSql = `
        SELECT id, category_name, status
        FROM categories
        ORDER BY id DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      const [categories] = await conn.query(dataSql);
      const countSql = `
        SELECT COUNT(*) AS total
        FROM categories
      `;
      const [[{ total }]] = await conn.query(countSql);
      return {
        categories,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        totalCategories: total
      };
    } catch (error) {
      throw error;
    }
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
