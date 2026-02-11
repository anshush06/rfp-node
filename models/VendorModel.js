class VendorModel {
  static async getAllVendors(conn, page, limit) {
    try {
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      const offset = (page - 1) * limit;
      const dataSql = `
        SELECT id, firstname, lastname, email, phone_no, status
        FROM vendors
        ORDER BY date_modified DESC
        LIMIT ? OFFSET ?
      `;
      const [vendors] = await conn.query(dataSql, [limit, offset]);
      const countSql = `
        SELECT COUNT(*) AS total
        FROM vendors
      `;
      const [[{ total }]] = await conn.query(countSql);
      return {
        vendors,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        totalVendors: total
      };
    } catch (error) {
      throw error;
    }
  }
  static async getUserByEmail(email, conn) {
    try {
      const sql = `SELECT * FROM vendors WHERE email = ?`;
      const [rows] = await conn.execute(sql, [email]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  }
  static async insertUser(data, conn) {
    try {
      const sql = `
        INSERT INTO vendors
        (firstname, lastname, email, password, revenue, no_of_employees, gst_no, pan_no, phone_no)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const [result] = await conn.execute(sql, [
        data.firstName,
        data.lastName,
        data.email,
        data.password,
        data.revenue,
        data.noOfEmployees,
        data.gstNo,
        data.panNo,
        data.phoneNo
      ]);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }
  static async getVendorByID(id, conn) {
    try {
      const sql = `SELECT * FROM vendors WHERE id = ?`;
      const [rows] = await conn.execute(sql, [id]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  }

  static async getVendorsByIDs(ids, conn) {
    try {
      if (!ids || ids.length === 0) return [];
      const placeholders = ids.map(() => '?').join(',');
      const sql = `SELECT * FROM vendors WHERE id IN (${placeholders})`;
      const [rows] = await conn.execute(sql, ids);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async toggleStatus(data, conn) {
    try {
      const sql = `
        UPDATE vendors SET status
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

module.exports = VendorModel;
