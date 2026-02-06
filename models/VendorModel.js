class VendorModel {

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
}

module.exports = VendorModel;
