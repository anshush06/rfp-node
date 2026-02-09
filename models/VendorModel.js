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
        LIMIT ${limit} OFFSET ${offset}
      `;
      const [vendors] = await conn.query(dataSql);
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
