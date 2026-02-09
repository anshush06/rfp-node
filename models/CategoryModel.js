class CategoryModel {

  static async getAllCategories(conn, page, limit) {
    try {
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      const offset = (page - 1) * limit;
      const dataSql = `
        SELECT id, category_name, status
        FROM categories
        ORDER BY date_modified DESC
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
  static async getCategoryDetailsByID(conn, id) {
    try {
      const dataSql = `
        SELECT id, category_name, status
        FROM categories
        WHERE id = ?
        LIMIT 1
      `;
      const [rows] = await conn.query(dataSql, [id]);
      return rows[0] || null;
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
  static async updateCategory(id, data, conn) {
    try {
      const sql = `
        UPDATE categories SET category_name
        = (?) WHERE id = (?)
      `;
      const [result] = await conn.execute(sql, [
        data.category_name,
        id
      ]);
      return result;
    } catch (error) {
        throw error;
    }
  }
  static async toggleStatus(data, conn) {
    try {
      const sql = `
        UPDATE categories SET status
        = (?) WHERE id = (?)
      `;
      const [result] = await conn.execute(sql, [
        data.status,
        data.id
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CategoryModel;
