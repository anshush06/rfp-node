class RfpModel {
  static async getRfpByID(id, conn) {
    try {
      const sql = `SELECT * FROM rfps WHERE id = ?`;
      const [rows] = await conn.execute(sql, [id]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  }
  static async getRfpsByID(conn, userId, page, limit) {
    try {
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      const offset = (page - 1) * limit;
      const dataSql = `
          SELECT id, rfp_number, name, lastdate, minprice, maxprice, status
          FROM rfps
          WHERE created_by = ?
          ORDER BY date_modified DESC
          LIMIT ? OFFSET ?
      `;
      const [rfps] = await conn.query(dataSql, [userId, limit, offset]);
      const countSql = `
          SELECT COUNT(*) AS total
          FROM rfps
          WHERE created_by = ?
      `;
      const [[{ total }]] = await conn.query(countSql, [userId]);
      return {
        rfps,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        totalRfps: total
      };
    } catch (error) {
      throw error;
    }
  }

  static async insertRfp(data, conn) {
    try {
      const rfpNumber = Math.floor(1000 + Math.random() * 9000);
      const sql = `
        INSERT INTO rfps
        (
            rfp_number,
            name,
            description,
            quantity,
            lastdate,
            minprice,
            maxprice,
            created_by,
            category_id,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
      const [result] = await conn.execute(sql, [
        rfpNumber,
        data.item_name,
        data.item_description,
        data.quantity,
        data.lastdate,
        data.minprice,
        data.maxprice,
        data.created_by,     // user id
        data.category_id,
        1                    // active by default
      ]);

      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  static async updateRfp(id, data, conn) {
    try {
      const sql = `
        UPDATE rfps SET name = ?, description = ? WHERE id = ?
      `;
      const [result] = await conn.execute(sql, [
        data.item_name,
        data.item_description,
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
        UPDATE rfps SET status
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

module.exports = RfpModel;
